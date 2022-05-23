import { rest } from 'msw';
import { screen } from '@testing-library/react';
import {
    describe, beforeAll, afterEach, afterAll, test, expect,
} from 'vitest';
import PokemonTile from './PokemonTile';
import { renderWithProviders } from '../../test/testUtils';
import { server } from '../../test/server';

describe('Pokemon Tile', () => {
    beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    test('loads and displays default info', async () => {
        renderWithProviders(<PokemonTile name='bulbasaur' />);

        await screen.findByRole('img');

        const image = screen.getByRole('img');
        const imgUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png';
        expect(image).toHaveAttribute('src', imgUrl);
        expect(image).toHaveAttribute('alt', 'Bulbasaur');
    });

    test('handles server error', async () => {
        server.use(
            rest.get(
                'https://pokeapi.co/api/v2/pokemon/bulbasaur',
                (req, res, ctx) => res(ctx.status(500))
            )
        );

        renderWithProviders(<PokemonTile name='bulbasaur' />);

        expect(await screen.findByText('Oh no, there was an error')).toBeInTheDocument();
    });
});
