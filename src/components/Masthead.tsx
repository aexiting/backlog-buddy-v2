import { Button, Flex, Heading, useTheme, View } from "@aws-amplify/ui-react";
import type { UseAuthenticator } from "@aws-amplify/ui-react-core";


type MastheadProps = {
    username: string;
    avatar?: string;
    signOut?: UseAuthenticator["signOut"];
}

export const Masthead = ({ username, signOut }: MastheadProps) => {
    const theme = useTheme();

    return (
        <View
            as="header"
            position="relative"
            width="100%"
            padding="1rem 2rem"
            backgroundColor={theme.tokens.colors.background.secondary}
            border={`1px solid ${theme.tokens.colors.border.primary}`}
        >
            <Flex
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Heading
                    color={theme.tokens.colors.font.primary}
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