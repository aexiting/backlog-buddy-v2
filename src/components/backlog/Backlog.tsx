import type { BacklogActions, BacklogState } from "./use-backlog.ts";
import { Button, Card, Divider, Flex, Heading, Loader, View } from "@aws-amplify/ui-react";
import { BacklogSearch } from "./BacklogSearch.tsx";
import { BacklogList } from "./BacklogList.tsx";

export type BacklogProps = {
    state: BacklogState;
    actions: BacklogActions;
}

export const Backlog = ({ state, actions }: BacklogProps) => {
    const { hasMore, isLoading, isError, items } = state;
    const {loadMoreBacklog} = actions;
    return (
        <View>
            <BacklogSearch state={{ ...state }} actions={{ ...actions }}/>
            <Divider orientation="horizontal" marginBottom="20px"/>
            <Button
                marginTop="1rem"
                variation="primary" onClick={() => actions.setIsBacklogInputOpen(
                true)}> {state.activeItem ? "Edit backlog item" : 'Add to list'}
            </Button>
            {(!items || items.length == 0) && <Card height="100%" width="100%" position="absolute">
                {isError && <Heading> There was an error when loading the backlog... please refresh.</Heading>}
                <Heading textAlign="center" level={3}>No Results</Heading>
            </Card>}
            <BacklogList state={{ ...state }} actions={{ ...actions }}/>
            {hasMore && (
                <Flex justifyContent="center">
                    <Button
                        variation="primary"
                        onClick={() => loadMoreBacklog()}
                        isLoading={isLoading}
                    >
                        {isLoading ? <Loader size="small"/> : 'Load more'}
                    </Button>
                </Flex>
            )}
        </View>
    )
}