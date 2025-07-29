import { type BacklogItem, ItemStatus, ItemType } from "../../../API.ts";
import { useCallback, useEffect, useRef, useState } from "react";
import { generateClient } from "aws-amplify/api";
import { searchBacklogItems } from "../../graphql/queries.ts";

export type BacklogSearchActions = {
    setTitle: (text: string) => void;
    setType: (type: ItemType) => void;
    setRating: (rating: number) => void;
    setStatus: (status: ItemStatus) => void;
    loadMoreBacklog: () => Promise<void>;
}

export type BacklogSearchState = {
    isLoading: boolean;
    isError: boolean;
    title: string;
    type?: ItemType;
    rating?: number;
    status?: ItemStatus;
    items: BacklogItem[];
}

const useDebounce = <T>(value: T, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return (() => {
            clearTimeout(handler)
        })
    }, [value, delay]);

    return debouncedValue
}

const MAX_ENTRIES = 10;
export const useBacklogSearch = (): [BacklogSearchState, BacklogSearchActions] => {

    const clientRef = useRef(generateClient());
    const from = useRef(0)
    const client = clientRef.current;

    const initialState: BacklogSearchState = {
        isLoading: false,
        isError: false,
        title: "",
        items: []
    }

    const [state, setState] = useState(initialState);
    const debouncedState = useDebounce(state, 500)

    const performSearch = useCallback(async (offset: number, isLoadMore = false) => {
        setState(prevState => ({ ...prevState, isLoading: true, isError: false }));

        const { type, rating, title, status } = debouncedState;
        const input = {
            ...(type && { type }),
            ...(status && { status }),
            ...(rating && { rating }),
            title: title || "",
        };

        try {
            const { data } = await client.graphql({
                query: searchBacklogItems,
                variables: {
                    ...input,
                    from: offset,
                    owner: "adam",
                },
                authMode: "userPool"
            });

            const searchResults = data.searchBacklogItems;
            if (!searchResults) {
                console.log("No backlog data available.");
                return;
            }

            const newItems = searchResults.filter(result => result != undefined);

            setState(prevState => ({
                ...prevState,
                items: isLoadMore ? [...prevState.items, ...newItems] : newItems,
            }));

        } catch (err) {
            setState(prevState => ({ ...prevState, isError: true }));
            console.log("There was an error calling graphql", err);
        } finally {
            setState(prevState => ({ ...prevState, isLoading: false }));
        }
    }, [debouncedState.title, debouncedState.rating, debouncedState.status, debouncedState.type]);

    const fetchBacklog = useCallback(async () => {
        from.current = 0;
        await performSearch(0, false);
    }, [performSearch]);

    const loadMoreBacklog = useCallback(async () => {
        const newOffset = from.current + MAX_ENTRIES;
        from.current = newOffset;
        await performSearch(newOffset, true);
    }, [performSearch]);

    useEffect(() => {
        from.current = 0;
        fetchBacklog()
    }, [debouncedState.title, debouncedState.rating, debouncedState.status, debouncedState.type, client]);


    return [state, {
        loadMoreBacklog,
        setTitle: (text: string) => setState(prevState => ({ ...prevState, title: text })),
        setRating: (rating: number) => setState(prevState => ({ ...prevState, rating })),
        setType: (type: ItemType) => setState(prevState => ({ ...prevState, type })),
        setStatus: (status: ItemStatus) => setState(prevState => ({ ...prevState, status })),
    }]
}