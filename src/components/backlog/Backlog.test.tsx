import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Backlog } from './Backlog';
import type { BacklogActions, BacklogState } from './use-backlog';
import { type BacklogItem, ItemStatus, ItemType } from "../../../API";
// Mock child components to isolate the Backlog component for unit testing.
// This ensures that tests for `Backlog` don't fail if a child component changes.
jest.mock('./BacklogSearch.tsx', () => ({
    BacklogSearch: () => <div data-testid="backlog-search" />,
}));

jest.mock('./BacklogList.tsx', () => ({
    BacklogList: () => <div data-testid="backlog-list" />,
}));

const testItem: BacklogItem = {
    __typename: "BacklogItem",
    createdAt: "",
    id: "",
    image: "",
    owner: "",
    rating: 0,
    status: ItemStatus.STARTED,
    title: "",
    type: ItemType.ANIME,
    updatedAt: ""

}

/**
 * A helper function to create mock props for the Backlog component.
 * This reduces boilerplate code in our tests.
 * @param state - Partial state to override defaults.
 * @param actions - Partial actions to override defaults.
 * @returns Complete props object for the Backlog component.
 */
const createTestProps = (
    state: Partial<BacklogState> = {},
    actions: Partial<BacklogActions> = {}
) => {
    const defaultState: BacklogState = {
        isBacklogInputOpen: false,
        rating: 0,
        status: undefined,
        title: "",
        type: undefined,
        items: [],
        isLoading: false,
        isError: false,
        hasMore: false,
        activeItem: undefined
    };

    const defaultActions: BacklogActions = {
        setActiveItem: jest.fn(),
        setBacklogList:jest.fn(),
        setRating: jest.fn(),
        setStatus: jest.fn(),
        setType: jest.fn(),
        loadMoreBacklog: jest.fn(),
        setIsBacklogInputOpen: jest.fn(),
        setTitle: jest.fn()
    };

    return {
        state: { ...defaultState, ...state },
        actions: { ...defaultActions, ...actions } as BacklogActions,
    };
};

describe('Backlog Component', () => {
    it('renders backlog list properly', () => {
        const props = createTestProps();
        const { getByTestId, getByRole, queryByTestId  } = render(<Backlog {...props} />);

        expect(getByTestId('backlog-search')).toBeInTheDocument();
        expect(getByTestId('backlog-list')).toBeInTheDocument();
        expect(queryByTestId("loader")).not.toBeInTheDocument();
        expect(queryByTestId("load-more")).not.toBeInTheDocument();
        expect(queryByTestId("error-text")).not.toBeInTheDocument();
        expect(getByRole('button', { name: 'Add to list' })).toBeInTheDocument();
    });

    it('calls setIsBacklogInputOpen with true once when "Add to list" is clicked', () => {
        const props = createTestProps();
        props.state.isLoading = true;
        const { getByRole } = render(<Backlog {...props} />);

        const addButton = getByRole('button', { name: 'Add to list' });

        addButton.click();

        expect(props.actions.setIsBacklogInputOpen).toHaveBeenCalledTimes(1);
        expect(props.actions.setIsBacklogInputOpen).toHaveBeenCalledWith(true);
    })

    it('shows loader when hasMore is true and isLoading is true', () => {
        const props = createTestProps();

        props.state.hasMore = true;
        props.state.isLoading = true;
        const { getByTestId } = render(<Backlog {...props} />);

        expect(getByTestId("loader")).toBeInTheDocument();
    })

    it('calls loadMoreBacklog when loadMore button is clicked', () => {
        const props = createTestProps();

        props.state.hasMore = true;
        const { getByTestId } = render(<Backlog {...props} />);

        expect(getByTestId("load-more")).toBeInTheDocument();

        const loadMoreButton = getByTestId("load-more");

        loadMoreButton.click();

        expect(props.actions.loadMoreBacklog).toHaveBeenCalledTimes(1);
    })


    it('shows "edit backlog item" instead of Add to list when activeItem exists', () => {
        const props = createTestProps();

        props.state.activeItem = testItem;
        const { getByRole } = render(<Backlog {...props} />);

        expect(getByRole('button', { name: 'Edit backlog item' })).toBeInTheDocument();
    })

    it('shows error text when an isError is true', () => {
        const props = createTestProps();

        props.state.isError = true;
        const { getByTestId } = render(<Backlog {...props} />);

        expect(getByTestId("error-text")).toBeInTheDocument();
    })

});