import { type BacklogItem, ItemStatus, ItemType } from "../../API.ts";
import { useCallback, useEffect, useRef, useState } from "react";
import { generateClient } from "aws-amplify/api";
import { searchBacklogItems } from "../graphql/queries.ts";


export type UseBacklogSearch = {
    onBacklogFetch: (items: BacklogItem[]) => void;
}

export type BacklogSearchActions = {
    setTitle: (text: string) => void;
    setType: (type: ItemType) => void;
    setRating: (rating: number) => void;
    setStatus: (status: ItemStatus) => void;

}

export type BacklogSearchState = {
    isLoading: boolean;
    isError: boolean;
    title: string;
    type?: ItemType;
    rating?: number;
    status?: ItemStatus;
}


const useDebounce  = <T>(value: T, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(()=> {
            setDebouncedValue(value)
        }, delay)

        return (() => {
            clearTimeout(handler)
        })
    }, [value, delay]);

    return debouncedValue
}

export const useBacklogSearch = ({ onBacklogFetch }: UseBacklogSearch): [BacklogSearchState, BacklogSearchActions] => {

    const clientRef = useRef(generateClient());
    const from = useRef(0)
    const client = clientRef.current;

    const initialState: BacklogSearchState = {
        isLoading: false,
        isError: false,
        title: "",
    }

    const [state, setState] = useState(initialState);
    const debouncedState = useDebounce(state, 500)

    const fetchBacklog = useCallback ( async () => {
        setState(prevState => ({...prevState, isLoading: true, isError: false}))
        const {type, rating, title, status} = debouncedState
        const input = {
            ...(type && { type: type }),
            ...(status && { status }),
            ...(rating && { rating }),
            title: title || "",
            // if there's a blank value we can do a search for everything using wildcard
        }

        try {
            console.log(input)
            const { data } = await client.graphql({
                query: searchBacklogItems,
                variables: {
                    ...input,
                    from: from.current, // later on we should allow for more results but keep it simple for now
                    owner: "adam",
                },
                authMode: "userPool"
            })
            const searchResults = data.searchBacklogItems
            if (!searchResults) {
                console.log("No backlog data available.")
                return
            }

            onBacklogFetch(searchResults.filter(result => result != undefined))
        }
        catch(err) {
            setState(prevState => ({...prevState, isError: true}))
            console.log("There was an error calling graphql", err)
        }
        finally {
            setState(prevState => ({...prevState, isLoading: false}))
        }

    }, [debouncedState.title])

    useEffect(() => {
        fetchBacklog()
    }, [debouncedState.title, fetchBacklog,  client]);

    
    return [state, {
        setTitle: (text: string) => setState(prevState => ({ ...prevState, title: text })),
        setRating: (rating: number) => setState(prevState => ({ ...prevState, rating })),
        setType: (type: ItemType) => setState(prevState => ({ ...prevState, type })),
        setStatus: (status: ItemStatus) => setState(prevState => ({ ...prevState, status })),
    }]
}