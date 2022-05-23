import { describe } from 'vitest';
import { renderWithProviders } from '../../test/testUtils';
import PaginationWrapper from './PaginationWrapper';
import userEvent from '@testing-library/user-event';
import { act } from '@testing-library/react';

describe('Pagination wrapper', () => {
    const count = 9;
    const pageSize = 20;

    test('renders given page', () => {
        let page = 1;
        const wrapper = <PaginationWrapper count={count * pageSize} defaultPage={page} defaultPageSize={pageSize}><></></PaginationWrapper>;
        const { getByRole } = renderWithProviders(wrapper);

        expect(getByRole('button', { name: '1' })).toBeDisabled();
        expect(getByRole('button', { name: '5' })).toBeEnabled();

        page = 5;

        expect(getByRole('button', { name: '1' })).toBeEnabled();
        expect(getByRole('button', { name: '5' })).toBeDisabled();
    });

    describe('with first page selected', () => {
        const wrapper = <PaginationWrapper count={count * pageSize} defaultPageSize={pageSize}><></></PaginationWrapper>;
        test('has "first" button disabled', () => {
            const { getByRole } = renderWithProviders(wrapper);

            expect(getByRole('button', { name: '<<' })).toBeDisabled();
        });

        test('has "previous" button disabled', () => {
            const { getByRole } = renderWithProviders(wrapper);

            expect(getByRole('button', { name: '<' })).toBeDisabled();
        });

        test('has "last" button enabled', () => {
            const { getByRole } = renderWithProviders(wrapper);

            expect(getByRole('button', { name: '>>' })).toBeEnabled();
        });

        test('has "next" button enabled', () => {
            const { getByRole } = renderWithProviders(wrapper);

            expect(getByRole('button', { name: '>' })).toBeEnabled();
        });
    });

    describe('with middle page selected', () => {
        const page = Math.ceil((count * pageSize) / 2);
        const wrapper = <PaginationWrapper count={count * pageSize}
            defaultPage={page}
            defaultPageSize={pageSize}><></></PaginationWrapper>;

        test('"first" button sets page to 1', async () => {
            const { getByRole } = renderWithProviders(wrapper);
            const user = userEvent.setup();

            await user.click(getByRole('button', { name: '1' }));

            expect(getByRole('button', { name: '1' })).toBeDisabled();
        });

        test('"previous" button decrements selected page', async () => {
            const { getByRole } = renderWithProviders(wrapper);
            const user = userEvent.setup();

            await user.click(getByRole('button', { name: '<' }));

            expect(getByRole('button', { name: '4' })).toBeDisabled();
        });

        test('"next" button increments selected page', async () => {
            const { getByRole } = renderWithProviders(wrapper);
            const user = userEvent.setup();

            await user.click(getByRole('button', { name: '>' }));

            expect(getByRole('button', { name: '6' })).toBeDisabled();
        });

        test('"last" button sets page to 9', async () => {
            const { getByRole } = renderWithProviders(wrapper);
            const user = userEvent.setup();

            await user.click(getByRole('button', { name: '>>' }));

            expect(getByRole('button', { name: '9' })).toBeDisabled();
        });

        test('"3" button sets page to 3', async () => {
            const { getByRole } = renderWithProviders(wrapper);
            const user = userEvent.setup();

            await act(() => user.click(getByRole('button', { name: '3' })));

            expect(getByRole('button', { name: '3' })).toBeDisabled();
        });
    });

    describe('with last page selected', () => {
        const wrapper = <PaginationWrapper count={count * 20} defaultPage={count}><></></PaginationWrapper>;

        test('has "first" button enabled', () => {
            const { getByRole } = renderWithProviders(wrapper);

            expect(getByRole('button', { name: '<<' })).toBeEnabled();
        });

        test('has "previous" button enabled', () => {
            const { getByRole } = renderWithProviders(wrapper);

            expect(getByRole('button', { name: '<' })).toBeEnabled();
        });

        test('has "last" button disabled', () => {
            const { getByRole } = renderWithProviders(wrapper);

            expect(getByRole('button', { name: '>>' })).toBeDisabled();
        });

        test('has "next" button disabled', () => {
            const { getByRole } = renderWithProviders(wrapper);

            expect(getByRole('button', { name: '>' })).toBeDisabled();
        });
    });
});
