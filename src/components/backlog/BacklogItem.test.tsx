import '@testing-library/jest-dom';
import { render } from "@testing-library/react";
import { BacklogItem, type BacklogItemProps, DatePill } from "./BacklogItem";
import { ItemStatus, ItemType } from "../../../API";


const createTestProps = (props: BacklogItemProps = {
    status: ItemStatus.COMPLETED,
    type: ItemType.ANIME,
    title: "testTitle",
    image: "testImage",
    rating: 0,
    createdAt: "testDate"
}) => {
    return { ...props }
}

describe('Date Pill', () => {
    it('should render and format an ISO date string correctly', () => {
        const testDate = '2025-08-15T10:30:00.000Z';
        const {getByText} = render(<DatePill date={testDate} />);

        // Checks if the date is formatted to the expected MM/DD/YYYY format
        expect(getByText('08/15/2025')).toBeInTheDocument();
    });

    it('should handle another date format correctly', () => {
        const testDate = 'December 17, 1995 03:24:00';
        const {getByText} = render(<DatePill date={testDate} />);

        expect(getByText('12/17/1995')).toBeInTheDocument();
    });
});

describe('Backlog Item', () => {

    it("renders Backlog Item properly", () => {
        const props = createTestProps();
        const { getByRole, getByAltText } = render(<BacklogItem {...props} />);
        expect(getByRole('heading', { name: 'testTitle' })).toBeInTheDocument()

        const img = getByAltText('testTitle');
        expect(img).toBeInTheDocument()
        expect(img).toHaveAttribute('src', 'testImage')
    })

    it.each([
        { status: ItemStatus.COMPLETED, expectedText: 'COMPLETED', expectedVariation: 'success' },
        { status: ItemStatus.DROPPED, expectedText: 'DROPPED', expectedVariation: 'error' },
        { status: ItemStatus.NOT_STARTED, expectedText: 'NOT STARTED', expectedVariation: 'info' },
        { status: ItemStatus.STARTED, expectedText: 'STARTED', expectedVariation: 'info' },
        // Add any other statuses here in the future
    ])(`shows $expectedText with button type: $expectedVariation when status is $status`,
        ({ status, expectedText, expectedVariation }: {
            status: ItemStatus,
            expectedText: string,
            expectedVariation: string
        }) => {
            const props = createTestProps();
            const { getByText } = render(<BacklogItem {...props} status={status}/>);

            const statusBadge = getByText(expectedText);
            expect(statusBadge).toBeInTheDocument();
            expect(statusBadge).toHaveClass(`amplify-badge--${expectedVariation}`);
        })
})