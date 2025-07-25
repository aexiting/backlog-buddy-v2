import { ItemStatus, ItemType } from "../../../API.ts";
import { Badge, Card, Flex, Heading, Image, Rating, useTheme } from "@aws-amplify/ui-react";

export type BacklogItemProps = {
    status: ItemStatus;
    type: ItemType;
    title: string;
    image: string;
    rating: number;
    createdAt: string;
}

const MAX_RATING = 5;


type DatePillProps = {
    date: string;
};

export const DatePill = ({ date }: DatePillProps) => {
    const { tokens } = useTheme();


    const formatted = new Date(date).toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
    });

    return (
        <Badge
            size="small"
            borderRadius={tokens.radii.full}
            paddingInline={tokens.space.small}
            fontWeight={tokens.fontWeights.medium}
            backgroundColor={tokens.colors.blue["80"]}
            paddingBlock="6px"
        >
            {formatted}
        </Badge>
    );
};

export const BacklogItem = ({
                                status,
                                title,
                                rating,
                                type,
                                createdAt,
                                image
                            }: BacklogItemProps) => {
    const { tokens } = useTheme();

    return (
        <Card
            variation="elevated"
            backgroundColor={tokens.colors.background.primary}

            padding={tokens.space.medium}
            as="button"
        >
            <Flex direction="column" alignItems="flex-start">
                    <Image alt={title}
                           src={image}
                           objectFit="cover"/>
                <Flex direction="row" alignItems="flex-start" marginBlockEnd="0">
                    <Heading level={5}>
                        {title}
                    </Heading>
                </Flex>
                <Flex>
                    <Badge size="small" variation="info">
                        {type}
                    </Badge>
                    <Badge
                        size="small"
                        variation={
                            status === 'COMPLETED'
                                ? 'success'
                                : status === 'DROPPED'
                                    ? 'error'
                                    : 'info'
                        }
                    >
                        {status.replace('_', ' ')}
                    </Badge>
                    <DatePill date={createdAt}/>

                </Flex>
                <Flex>
                    <Rating
                        value={rating}
                        maxValue={MAX_RATING}
                        fillColor={tokens.colors.teal["80"]}
                        emptyColor={tokens.colors.neutral["40"]}
                    />
                </Flex>
            </Flex>
        </Card>
    )
}