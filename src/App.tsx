
import { Button, Divider, useTheme, View, withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import { type AuthUser } from "aws-amplify/auth";
import { type UseAuthenticator } from '@aws-amplify/ui-react-core';
import { useBacklogInput } from "./components/Backlog/use-backlog-input.ts";
import { useBacklogList } from "./components/Backlog/use-backlog-list.ts";
import { BacklogList } from "./components/Backlog/BacklogList.tsx";
import { BacklogInputForm } from "./components/Backlog/BacklogInputForm.tsx";
import { useBacklogSearch } from "./components/Backlog/use-backlog-search.ts";
import { BacklogSearch } from "./components/Backlog/BacklogSearch.tsx";
import { useState } from "react";
import { Masthead } from "./components/Masthead.tsx";
import { Dialog } from "./components/Dialog.tsx";

type AppProps = {
    signOut?: UseAuthenticator["signOut"];
    user?: AuthUser;
};

const App = withAuthenticator(({ signOut, user }: AppProps) => {
    const theme = useTheme();
    if (!signOut || !user) return <div>An auth error occurred. Please refresh.</div>

    const [isBacklogOpen, setIsBacklogInputOpen] = useState(false);

    const [listState, listActions] = useBacklogList();

    const [inputState, inputActions] = useBacklogInput({addToBacklogList: listActions.loadMoreBacklog, username: user.username, activeItem: listState.activeItem, clearActiveItem: () => listActions.setActiveItem(undefined)});

    const [searchState, searchActions] = useBacklogSearch({ onBacklogFetch: listActions.setBacklogList });

    return (
        <View backgroundColor={theme.tokens.colors.background.primary}>
            <Masthead username={user.username} signOut={signOut}/>
            <Dialog onClose={() => {
                setIsBacklogInputOpen(false)
                listActions.setActiveItem(undefined)
            }} isOpen={isBacklogOpen}>
                {<BacklogInputForm state={inputState} actions={inputActions}/>}
            </Dialog>
            <BacklogSearch state={searchState} actions={searchActions}>
                <Button
                    marginTop="1rem"
                    variation="primary" onClick={() => setIsBacklogInputOpen(true)}> {listState.activeItem ? "Edit backlog item" : 'Add to list'}
                </Button>
            </BacklogSearch>
            <Divider orientation="horizontal" marginBottom="20px"/>
            <BacklogList state={listState} actions={listActions}/>
        </View>
    )
});

export default App;