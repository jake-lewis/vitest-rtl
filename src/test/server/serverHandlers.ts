import { rest } from 'msw';

const handlers = [
    rest.get('https://pokeapi.co/api/v2/pokemon/bulbasaur', (req, res, ctx) => {
        const mockApiResponse = {
            name: 'bulbasaur',
            sprites: {
                front_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
            },
        };
        return res(ctx.json(mockApiResponse));
    }),
];

export { handlers };
