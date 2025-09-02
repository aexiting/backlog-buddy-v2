import type { BacklogListActions, BacklogListState } from "./use-backlog-list";
import { type BacklogItem, ItemStatus, ItemType } from "../../../API";
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { BacklogList } from "./BacklogList";

jest.mock('./BacklogSearch.tsx', () => ({
    BacklogItem: () => <div data-testid="backlog-item"/>,
}));


const testItem: BacklogItem = {
    __typename: "BacklogItem",
    createdAt: "someTime",
    id: "testId",
    image: "testImage",
    owner: "testUser",
    rating: 0,
    status: ItemStatus.STARTED,
    title: "test",
    type: ItemType.ANIME,
    updatedAt: "someTime"

}

const createProps = (
    state: Partial<BacklogListState> = {},
    actions: Partial<BacklogListActions> = {}
) => {
    const defaultState: BacklogListState = { items: [testItem] };
    const defaultActions: BacklogListActions = { setBacklogList: jest.fn(), setActiveItem: jest.fn() };

    return { state: { ...defaultState, ...state }, actions: { ...defaultActions, ...actions } }
}
describe('Backlog List', () => {

    it('renders Backlog item list properly', () => {
        const props = createProps();
        const { getByTestId } = render(<BacklogList {...props}/>)

        expect(getByTestId('backlog-list')).toBeInTheDocument();
    })

    it('calls setActive item when the respective Backlog item is clicked', () => {
        const props = createProps();
        const { getByTestId } = render(<BacklogList {...props}/>)

        const item = getByTestId('item-list-wrapper');
        item.click()
        expect(props.actions.setActiveItem).toHaveBeenCalledTimes(1);
    })
})