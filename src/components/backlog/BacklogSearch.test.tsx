import '@testing-library/jest-dom';
import type { BacklogSearchActions, BacklogSearchState } from "./use-backlog-search";
import { ItemStatus, ItemType } from "../../../API";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { BacklogSearch } from "./BacklogSearch";

describe('Backlog Search', () => {

    let mockActions: BacklogSearchActions;
    let defaultState: BacklogSearchState;

    afterEach(() => {
        cleanup();
    });

    beforeEach(() => {
        mockActions = {
            setTitle: jest.fn(),
            setType: jest.fn(),
            setStatus: jest.fn(),
            setRating: jest.fn(),
            loadMoreBacklog: jest.fn()
        };

        defaultState = {
            items: [],
            isLoading: false,
            isError: false,
            title: 'One Piece',
            type: ItemType.ANIME,
            status: ItemStatus.COMPLETED,
            rating: 5
        };
    });

    it('should render all form fields with initial state values', () => {
        const { getByLabelText } = render(<BacklogSearch state={defaultState} actions={mockActions}/>);

        expect(getByLabelText(/Title Search/i)).toHaveValue(defaultState.title);
        expect(getByLabelText(/Type/i)).toHaveValue(defaultState.type);
        expect(getByLabelText(/Status/i)).toHaveValue(defaultState.status);
        expect(getByLabelText(/Min-Rating/i)).toHaveValue(defaultState.rating?.toString());
    });

    it('should call action handlers when user interacts with form fields', () => {
        const { getByLabelText } = render(<BacklogSearch state={defaultState} actions={mockActions}/>);

        const titleInput = getByLabelText(/Title Search/i);
        fireEvent.change(titleInput, { target: { value: 'Bleach' } });
        expect(mockActions.setTitle).toHaveBeenCalledWith('Bleach');

        const typeInput = getByLabelText(/Type/i);
        fireEvent.change(typeInput, { target: { value: ItemType.MANGA } });
        expect(mockActions.setType).toHaveBeenCalledWith('MANGA');

        const statusInput = getByLabelText(/Status/i);
        fireEvent.change(statusInput, { target: { value: ItemStatus.COMPLETED } });
        expect(mockActions.setStatus).toHaveBeenCalledWith('COMPLETED');

        const ratingInput = getByLabelText(/Min-Rating/i);
        fireEvent.change(ratingInput, { target: { value: defaultState.rating } });
        expect(mockActions.setRating).toHaveBeenCalledWith(defaultState.rating);

        const clearButton = getByLabelText(/Clear input/i);
        clearButton.click();
        expect(mockActions.setTitle).toHaveBeenCalledWith('');
    });

    it('should display an error alert when isError is true', () => {
        const errorState = { ...defaultState, isError: true };
        const { getByRole, getByText } = render(<BacklogSearch state={errorState} actions={mockActions}/>);

        const alert = getByRole('alert');
        expect(alert).toBeInTheDocument();
        expect(getByText(/Something went wrong/i)).toBeInTheDocument();
    });

    it('should not display loader or alert by default', () => {
        const { queryByRole } = render(<BacklogSearch state={defaultState} actions={mockActions}/>);

        expect(queryByRole('progressbar')).not.toBeInTheDocument();
        expect(queryByRole('alert')).not.toBeInTheDocument();
    });

    it('should not display loader when isLoading is true', () => {
        const loadingState = { ...defaultState, isLoading: true };

        const { queryByRole, getByLabelText } = render(<BacklogSearch state={loadingState} actions={mockActions}/>);
        expect(getByLabelText(/Title Search/i)).toBeDisabled()
        expect(queryByRole('progressbar')).toBeInTheDocument();
    });

    it('should select the "All" option when the rating is undefined', () => {
        const stateWithoutRating = { ...defaultState, rating: undefined };

        const { getByLabelText } = render(<BacklogSearch state={stateWithoutRating} actions={mockActions}/>);

        const ratingSelect = getByLabelText(/Min-Rating/i);
        expect(ratingSelect).toHaveValue('All');
    });

    it('should render children when provided', () => {
        const { getByText } = render(
            <BacklogSearch state={defaultState} actions={mockActions}>
                <div>My Child Component</div>
            </BacklogSearch>
        );

        expect(getByText('My Child Component')).toBeInTheDocument();
    });

})