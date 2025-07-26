import { ItemStatus, ItemType } from "../../../../API.ts";
import type { BacklogInputActions, BacklogInputState } from "./use-backlog-input.ts";
import {
    Alert,
    Button,
    Card,
    Flex, Grid,
    Heading,
    SelectField,
    SliderField,
    TextField, useTheme,
    View
} from "@aws-amplify/ui-react";

type BacklogInputFormProps = {
    state: BacklogInputState,
    actions: BacklogInputActions,
};


export const BacklogInputForm = ({ state, actions }: BacklogInputFormProps) => {
    const theme = useTheme();
    const { input, isLoading, isError, isEditMode } = state;
    const { setInput, submitBacklogItem, submitBacklogEdit, submitBacklogDelete } = actions;

    const onChange =
        <K extends keyof typeof input>(key: K) =>
            (value: string | number) =>
                setInput({ ...input, [key]: value });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditMode) {
            submitBacklogEdit();
        } else {
            submitBacklogItem();
        }
    };

    return (
        <Card
            position="fixed"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            width="60vw"
            backgroundColor={theme.tokens.colors.background.secondary}
            border={`1px solid ${theme.tokens.colors.border.primary}`}
        >
            <View as="form" onSubmit={handleSubmit}>
                <Flex direction="row" gap="1rem" justifyContent="space-between">

                    <Heading level={4} >
                        {isEditMode ? "Edit Backlog item" : "Add to Backlog"}
                    </Heading>
                    {isEditMode && <Button
                        variation="warning"
                        loadingText="Deleting..."
                        onClick={()=> {

                            const confirmed = confirm("Are you sure you want to delete the current backlog item?")
                            if (confirmed) {
                                submitBacklogDelete()
                            }
                        }}
                    >
                        Delete
                    </Button>}
                </Flex>
                <Grid templateColumns="repeat(1, 1fr)" gap="1rem">
                    <TextField
                        label="Title"
                        placeholder="Cowboy Bebop"
                        value={input.title}
                        onChange={(e) => onChange('title')(e.target.value)}
                        isRequired
                        isDisabled={isEditMode}
                    />
                    <SelectField
                        label="Type"
                        value={input.type}
                        onChange={(e) => onChange('type')(e.target.value as ItemType)}
                    >
                        <option value={ItemType.ANIME}>Anime</option>
                        <option value={ItemType.MANGA}>Manga</option>
                    </SelectField>
                    {isEditMode && <SelectField
                        label="Status"
                        value={input.status}
                        onChange={(e) => onChange('status')(e.target.value as ItemStatus)}
                    >
                        <option value={ItemStatus.COMPLETED}>Completed</option>
                        <option value={ItemStatus.DROPPED}>Dropped</option>
                        <option value={ItemStatus.STARTED}>Watching</option>
                        <option value={ItemStatus.NOT_STARTED}>Not Started</option>

                    </SelectField>}


                    <SliderField
                        label="Rating"
                        min={1}
                        max={5}
                        step={1}
                        value={input.rating}
                        onChange={(value) => onChange('rating')(value)}
                        isValueHidden={false}
                    />

                    {isError && (
                        <Alert variation="error" isDismissible={true}>
                            Something went wrong—please try again.
                        </Alert>
                    )}

                    <Button
                        type="submit"
                        variation="primary"
                        isLoading={isLoading}
                        loadingText="Adding…"
                        name="save"
                    >
                        {isEditMode ? 'Update backlog' : 'Add to backlog'}
                    </Button>
                </Grid>
            </View>
        </
            Card>

    );
};