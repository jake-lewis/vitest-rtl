import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../../test/testUtils';
import Counter from './Counter';

describe('Counter component', () => {
    test('renders a button with default count of 0', async () => {
        renderWithProviders(<Counter/>);

        expect(screen.getByText('count is:', { exact: false })).toHaveTextContent('count is: 0');
    });

    test('increments count when clicked', async () => {
        renderWithProviders(<Counter/>);

        fireEvent.click(screen.getByText('count is:', { exact: false }));

        expect(screen.getByText('count is:', { exact: false })).toHaveTextContent('count is: 1');
    });
});
