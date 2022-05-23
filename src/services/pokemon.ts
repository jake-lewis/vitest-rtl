import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { NamedAPIResourceList, Pokemon } from 'pokenode-ts';

export const pokemonApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
    tagTypes: ['Pokemon', 'PokemonCount'],
    endpoints: (builder) => ({
        getPokemonByName: builder.query<Pokemon, string>({
            query: (name) => `pokemon/${name}`,
            providesTags: (result) => (result ? [{ type: 'Pokemon', id: result.name }] : []),
        }),
        getPokemon: builder.query<NamedAPIResourceList, { limit: number, offset: number }>({
            query: ({ limit, offset }) => `pokemon/?limit=${limit}&offset=${offset}`,
            transformResponse: (response: NamedAPIResourceList, meta, { limit, offset }) => ({ ...response, limit, offset }),
            providesTags: (resourceList) => resourceList?.results.map((resource) => ({ type: 'Pokemon' as const, id: resource.name })) ?? [],
        }),
        getPokemonCount: builder.query<number, void>({
            query: () => 'pokemon/?limit=1&offset=0',
            transformResponse: (response: NamedAPIResourceList) => response.count,
            providesTags: ['PokemonCount'],
        }),
    }),
});

// Export hooks for usage in functional components
export const { useGetPokemonByNameQuery, useGetPokemonQuery, useGetPokemonCountQuery } = pokemonApi;
