import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { Character, CharacterNormalized, Page } from '~/types';

const BASE_URL = 'https://swapi.dev/api/people/';

// SWAPI serves ten characters a page.
export const PAGE_SIZE = 10;

// SWAPI gives a character no id of its own: it is the last part of the
// character's url.
const withId = (character: Character): CharacterNormalized => {
  const parts = character.url.split('/').filter(Boolean);
  return { ...character, id: parseInt(parts[parts.length - 1], 10) };
};

export const swApi = createApi({
  reducerPath: 'swApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getCharacters: builder.query<
      Page<CharacterNormalized>,
      { search: string; page: number }
    >({
      query: ({ search, page }) => ({
        url: '',
        params: { search: search || undefined, page },
      }),
      transformResponse: ({ count, results }: Page<Character>) => ({
        count,
        results: results.map(withId),
      }),
    }),
    getDetails: builder.query<CharacterNormalized, string>({
      query: (id) => id,
      transformResponse: withId,
    }),
  }),
});

export const { useGetCharactersQuery, useGetDetailsQuery } = swApi;
