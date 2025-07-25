
import { Button, Heading, withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import { type AuthUser } from "aws-amplify/auth";
import { type UseAuthenticator } from '@aws-amplify/ui-react-core';
import { useBacklogInput } from "./components/use-backlog-input.ts";
import { useBacklogList } from "./components/use-backlog-list.ts";
import { BacklogList } from "./components/BacklogList.tsx";
import { BacklogInputForm } from "./components/BacklogInputForm.tsx";
import { useBacklogSearch } from "./components/use-backlog-search.ts";
import { BacklogSearch } from "./components/BacklogSearch.tsx";
import { useState } from "react";
import { Masthead } from "./components/Masthead.tsx";

type AppProps = {
    signOut?: UseAuthenticator["signOut"];
    user?: AuthUser;
};

const App = withAuthenticator(({ signOut, user }: AppProps) => {
    if (!signOut || !user) return <div>An auth error occurred. Please refresh.</div>

    const [isInputModalOpen, setIsInputModalOpen] = useState(false);

    const [listState, listActions] = useBacklogList();

    const [inputState, inputActions] = useBacklogInput({addToBacklogList: listActions.loadMoreBacklog, username: user.username, activeItem: listState.activeItem, clearActiveItem: () => listActions.setActiveItem(undefined)});

    const [searchState, searchActions] = useBacklogSearch({ onBacklogFetch: listActions.setBacklogList });

    return (
        <div>
            <Masthead username={user.username} signOut={signOut}/>
            {isInputModalOpen && <BacklogInputForm state={inputState} actions={inputActions}/>}
            <BacklogSearch state={searchState} actions={searchActions}/>
            <Button onClick={() => setIsInputModalOpen(!isInputModalOpen)}> Add to List </Button>
            <BacklogList state={listState} actions={listActions}/>
        </div>
    )
});

export default App;