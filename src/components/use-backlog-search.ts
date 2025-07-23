import { type BacklogItem, ItemStatus, ItemType } from "../../API.ts";
import { useRef, useState } from "react";
import { generateClient } from "aws-amplify/api";
import { updateBacklogItem } from "../graphql/mutations.ts";
import { getBacklogItems, searchBacklogItems } from "../graphql/queries.ts";


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

const MAX_RESULTS = 10;

const useBacklogSearch = ({ onBacklogFetch }: UseBacklogSearch): [BacklogSearchState, BacklogSearchActions] => {

    const clientRef = useRef(generateClient());
    const from = useRef(0)
    const client = clientRef.current;

    const initialState: BacklogSearchState = {
        isLoading: false,
        isError: false,
        title: "",
    }

    const [state, setState] = useState(initialState);

    const fetchBacklog = async () => {
        setState(prevState => ({...prevState, isLoading: true, isError: false}))
        const input = {
            ...(state.type && { type: state.type }),
            ...(state.status && { status: state.status }),
            ...(state.rating && { rating: state.rating }),
            title: state.title.trim() === "" ? "*" : state.title // if there's a blank value we can do a search for everything using wildcard
        }

        try {
            const { data } = await client.graphql({
                query: searchBacklogItems,
                variables: {
                    ...input,
                    from: from.current,
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
            from.current += MAX_RESULTS // get the next 10 results later on
        }
        catch(err) {
            setState(prevState => ({...prevState, isError: true}))
            console.log("There was an error calling graphql", err)
        }
        finally {
            setState(prevState => ({...prevState, isLoading: false}))
        }

    }

    return [state, {
        setTitle: (text: string) => setState(prevState => ({ ...prevState, title: text })),
        setRating: (rating: number) => setState(prevState => ({ ...prevState, rating })),
        setType: (type: ItemType) => setState(prevState => ({ ...prevState, type })),
        setStatus: (status: ItemStatus) => setState(prevState => ({ ...prevState, status })),
    }]
}