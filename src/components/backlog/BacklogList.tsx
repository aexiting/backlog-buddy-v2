import { BacklogItem } from "./BacklogItem.tsx";
import type { BacklogListActions, BacklogListState } from "./use-backlog-list.ts";
import { motion } from 'framer-motion';
import { Flex } from "@aws-amplify/ui-react";


type BacklogListProps = {
    state: BacklogListState,
    actions: BacklogListActions
}

export const BacklogList = ({ state, actions }: BacklogListProps) => {

    return (
        <Flex direction="column">
            <Flex wrap="wrap" justifyContent="center" gap="xlarge">
                {state.items.map(item => (
                    <motion.div
                        key={item.id}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => actions.setActiveItem(item)}
                    >
                        <BacklogItem {...item} />
                    </motion.div>
                ))}
            </Flex>
        </Flex>
    )
}