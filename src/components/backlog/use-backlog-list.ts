import {
    type BacklogItem,
} from '../../../API.ts';
import { onCreateBacklogItem, onDeleteBacklogItem, onUpdateBacklogItem } from "../../graphql/subscriptions.ts";
import { generateClient } from "aws-amplify/api";
import { useEffect, useRef, useState } from "react";


export type BacklogListState = {
    items: BacklogItem[];
    activeItem?: BacklogItem;
}

export type BacklogListActions = {
    setActiveItem: (item?: BacklogItem) => void;
    setBacklogList: (items: BacklogItem[]) => void;
}

const initialState: BacklogListState = {
    items: [],
}

export const useBacklogList = (): [BacklogListState, BacklogListActions] => {

    const clientRef = useRef(generateClient())
    const client = clientRef.current;

    const [state, setState] = useState(initialState);

    useEffect(() => {
        const createSub = client.graphql({
            query: onCreateBacklogItem,
            authMode: 'userPool',
        }).subscribe({
            next: ({ data }) => setState(prevState => ({
                ...prevState,
                items: [...prevState.items, data.onCreateBacklogItem]
            }))
            ,
        });
        const updateSub = client.graphql({
            query: onUpdateBacklogItem,
            authMode: 'userPool',
        }).subscribe({
            next: ({ data }) => setState(prevState => ({
                ...prevState,
                items: prevState.items.map(item => item.id === data.onUpdateBacklogItem.id ? data.onUpdateBacklogItem : item )
            }))
            ,
        });
        const deleteSub = client.graphql({
            query: onDeleteBacklogItem,
            authMode: 'userPool',
        }).subscribe({
            next: ({ data }) => setState(prevState => ({
                ...prevState,
                items: prevState.items.filter(item => item.id !== data.onDeleteBacklogItem.id)
            }))
            ,
        });
        return () => {
            createSub.unsubscribe();
            updateSub.unsubscribe();
            deleteSub.unsubscribe();
        }
    }, []);

    return [state, {
        setActiveItem: (item?: BacklogItem) => setState(prevState => ({ ...prevState, activeItem: item })),
        setBacklogList: (items: BacklogItem[]) => setState(prevState => ({ ...prevState, items }))
    }]
}