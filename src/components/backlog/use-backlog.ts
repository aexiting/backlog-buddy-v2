import { type BacklogListActions, type BacklogListState, useBacklogList } from "./use-backlog-list.ts";
import { type BacklogSearchActions, type BacklogSearchState, useBacklogSearch } from "./use-backlog-search.ts";
import { useEffect, useState } from "react";

export type BacklogState = {
    isBacklogInputOpen: boolean;
    hasMore: boolean;
} & BacklogSearchState & BacklogListState
export type BacklogActions = {
    setIsBacklogInputOpen: (isOpen: boolean) => void;
} & BacklogSearchActions & BacklogListActions

export const useBacklog = (): [BacklogState, BacklogActions] => {
    const [listState, listActions] = useBacklogList();
    const [searchState, searchActions] = useBacklogSearch();
    const [isBacklogInputOpen, setIsBacklogInputOpen] = useState(false);
    const [hasMore, setHasMore] = useState(true);


    useEffect(() => {
        listActions.setBacklogList(searchState.items)
    }, [searchState.items]);


    return [{ ...listState, ...searchState, isBacklogInputOpen, hasMore }, {
        ...listActions, ...searchActions,
        setIsBacklogInputOpen
    }]
}