import { Button, Flex, Heading, View } from "@aws-amplify/ui-react";
import type { UseAuthenticator } from "@aws-amplify/ui-react-core";


type MastheadProps = {
    username: string;
    avatar?: string;
    signOut?: UseAuthenticator["signOut"];
}

export const Masthead = ({ username, signOut }: MastheadProps) => {

    const colors = {
        background: 'rgb(19, 28, 41)',
        textPrimary: 'rgb(230, 237, 245)',
        textSecondary: 'rgb(148, 163, 184)',
        border: 'rgb(30, 42, 58)',
    };

    return (
        <View
            as="header"
            position="relative"
            width="100%"
            padding="1rem 2rem"
            backgroundColor={colors.background}
            border={`1px solid ${colors.border}`}
        >
            <Flex
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Heading
                    color={colors.textPrimary}
                    fontWeight="500"
                    level={5}
                >
                    {username}'s Backlog Buddy
                </Heading>
                <Button
                    onClick={signOut}
                    variation="primary"
                    size="small"
                >
                    Sign out
                </Button>
            </Flex>
        </View>
    )
}