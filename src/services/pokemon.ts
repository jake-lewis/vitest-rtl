import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { response } from 'msw';
import { NamedAPIResourceList, Pokemon } from 'pokenode-ts';

interface Page extends NamedAPIResourceList {
  limit: number,
  offset: number
}

export const pokemonApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  tagTypes: ['Pokemon'],
  endpoints: (builder) => ({
    getPokemonByName: builder.query<Pokemon, string>({
      query: (name) => `pokemon/${name}`,
      providesTags: (result) => result ? [{ type: 'Pokemon', id: result.name }] : []
    }),
    getPokemon: builder.query<NamedAPIResourceList, { limit: number, offset: number }>({
      query: ({ limit, offset }) => `pokemon/?limit=${limit}&offset=${offset}`,
      transformResponse: (response: NamedAPIResourceList, meta, { limit, offset }) => ({ ...response, limit: limit, offset: offset }),
      providesTags: (resourceList) => resourceList?.results.map(resource => ({ type: 'Pokemon' as const, id: resource.name })) ?? [],
    })
  }),
});

// Export hooks for usage in functional components
export const { useGetPokemonByNameQuery, useGetPokemonQuery } = pokemonApi