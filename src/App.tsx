
import { useTheme, View, withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import { type AuthUser } from "aws-amplify/auth";
import { type UseAuthenticator } from '@aws-amplify/ui-react-core';
import { useBacklogInput } from "./components/backlog/backlog-input/use-backlog-input.ts";
import { BacklogInputForm } from "./components/backlog/backlog-input/BacklogInputForm.tsx";
import { Masthead } from "./components/Masthead.tsx";
import { Dialog } from "./components/Dialog.tsx";
import { Backlog } from "./components/backlog/Backlog.tsx";
import { useBacklog } from "./components/backlog/use-backlog.ts";

type AppProps = {
    signOut?: UseAuthenticator["signOut"];
    user?: AuthUser;
};

const App = withAuthenticator(({ signOut, user }: AppProps) => {
    const theme = useTheme();
    if (!signOut || !user) return <div>An auth error occurred. Please refresh.</div>

    const [backlogState, backlogActions] = useBacklog()
    const [inputState, inputActions] = useBacklogInput({username: user.username, activeItem: backlogState.activeItem, clearActiveItem: () => backlogActions.setActiveItem(undefined)});


    return (
        <View backgroundColor={theme.tokens.colors.background.primary}>
            <Masthead username={user.username} signOut={signOut}/>
            <Dialog onClose={() => {
                backlogActions.setIsBacklogInputOpen(false)
                backlogActions.setActiveItem(undefined)
            }} isOpen={backlogState.isBacklogInputOpen}>
                {<BacklogInputForm state={inputState} actions={inputActions}/>}
            </Dialog>
            <Backlog state={backlogState} actions={backlogActions}/>
        </View>
    )
});

export default App;