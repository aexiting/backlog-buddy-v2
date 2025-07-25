import type { BacklogSearchActions, BacklogSearchState } from "./use-backlog-search.ts";
import { Alert, Card, Flex, Label, Loader, SearchField, SelectField, TextField, View } from "@aws-amplify/ui-react";
import { ItemStatus, ItemType } from "../../API.ts";

type BacklogSearchProps = {
    state: BacklogSearchState,
    actions: BacklogSearchActions
}

export const BacklogSearch = ({ state, actions }: BacklogSearchProps) => {
    const { isLoading, isError, title, type, rating, status } = state;
    const { setTitle, setType, setRating, setStatus } = actions;


    return (
        <Card>
            <View as="form">
                <Flex direction="row" alignItems="center" justifyContent="flex-end">
                <SearchField
                    labelHidden={false}
                    label="Title Search"
                    value={title}
                    isDisabled={isLoading}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <SelectField
                    label="Type"
                    value={type}
                    onChange={(e) => setType(e.target.value as ItemType)}
                >
                    <option value={undefined}>All</option>
                    <option value={ItemType.ANIME}>Anime</option>
                    <option value={ItemType.MANGA}>Manga</option>
                </SelectField>
                <SelectField
                    label="Status"
                    value={status}
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
                    onChange={(e) => setRating(Number(e.target.value))}
                >
                    <option value={undefined}>All</option>
                    <option value={2}>Two Stars</option>
                    <option value={3}>Three Stars</option>
                    <option value={4}>Four Stars</option>
                    <option value={5}>Five Stars</option>
                </SelectField>
                {isLoading && <Loader variation="linear" />}
                {isError && (
                    <Alert variation="error" isDismissible={true} role="alert">
                        <p>Something went wrong try—please try again.</p>
                        <p>There was an error trying to search backlog.</p>
                    </Alert>
                )}
                </Flex>
            </View>
    </Card>
    )
}