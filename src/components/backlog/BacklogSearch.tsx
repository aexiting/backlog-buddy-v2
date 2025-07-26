import type { BacklogSearchActions, BacklogSearchState } from "./use-backlog-search.ts";
import { Alert, Card, Grid, Loader, SearchField, SelectField, useTheme, View } from "@aws-amplify/ui-react";
import { ItemStatus, ItemType } from "../../../API.ts";
import type { ReactNode } from "react";

type BacklogSearchProps = {
    state: BacklogSearchState,
    actions: BacklogSearchActions
    children?: ReactNode;
}

export const BacklogSearch = ({ state, actions, children }: BacklogSearchProps) => {
    const { isLoading, isError, title, type, rating, status } = state;
    const { setTitle, setType, setRating, setStatus } = actions;

    const theme = useTheme();

    return (
        <Card >
            <View as="form">
                <Grid
                    alignItems="end"
                    templateColumns="repeat(4, minmax(100px, 300px)) "
                    gap="3em"
                >
                <SearchField
                    labelHidden={false}
                    label="Title Search"
                    value={title}
                    isDisabled={isLoading}
                    onChange={(e) => setTitle(e.target.value)}
                    onClear={() => setTitle("")}
                />
                <SelectField
                    label="Type"
                    value={type}
                    isDisabled={isLoading}
                    onChange={(e) => setType(e.target.value as ItemType)}
                >
                    <option value={undefined}>All</option>
                    <option value={ItemType.ANIME}>Anime</option>
                    <option value={ItemType.MANGA}>Manga</option>
                </SelectField>
                <SelectField
                    label="Status"
                    value={status}
                    isDisabled={isLoading}
                    onChange={(e) => setStatus(e.target.value as ItemStatus)}
                >
                    <option value={undefined}>All</option>
                    <option value={ItemStatus.COMPLETED}>Completed</option>
                    <option value={ItemStatus.DROPPED}>Dropped</option>
                    <option value={ItemStatus.STARTED}>Watching</option>
                    <option value={ItemStatus.NOT_STARTED}>Not Started</option>
                </SelectField>
                <SelectField
                    label="Min-Rating"
                    value={rating?.toString()}
                    isDisabled={isLoading}
                    onChange={(e) => setRating(Number(e.target.value))}
                >
                    <option value={undefined}>All</option>
                    <option value={2}>Two Stars</option>
                    <option value={3}>Three Stars</option>
                    <option value={4}>Four Stars</option>
                    <option value={5}>Five Stars</option>
                </SelectField>
                {isError && (
                    <Alert variation="error" isDismissible={true} role="alert">
                        <p>Something went wrong try—please try again.</p>
                        <p>There was an error trying to search backlog.</p>
                    </Alert>
                )}
                </Grid>
                {children}
            </View>
            {isLoading && <Loader position="absolute" variation="linear" size="small" emptyColor={theme.tokens.colors.background.primary}/>}
        </Card>
    )
}