import * as React from 'react';
import PokemonSearch from './PokemonSearch';
import { rest } from 'msw';
import { waitFor, screen } from '@testing-library/react';
import { describe, beforeEach, afterEach, afterAll, test, expect } from 'vitest';
import { renderWithProviders } from '../../test/testUtils';
import { server } from '../../test/server';

describe('PokemonSearch', () => {
    beforeEach(() => server.listen({ onUnhandledRequest: 'error' }));
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    test('loads and displays default info', async () => {
        renderWithProviders(<PokemonSearch />);

        await waitFor(() => screen.getByRole('img'));

        const image = screen.getByRole('img');
        expect(image).toHaveAttribute('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png');
        expect(image).toHaveAttribute('alt', 'bulbasaur')
    });

    test('handles server error', async () => {
        server.use(
            rest.get(
                'https://pokeapi.co/api/v2/pokemon/bulbasaur',
                (req, res, ctx) => {
                    return res(ctx.status(500))
                }
            )
        );

        renderWithProviders(<PokemonSearch />);

        await waitFor(() => screen.getByText('Oh no, there was an error'));

        expect(screen.getByText('Oh no, there was an error')).toBeInTheDocument();
    })
})