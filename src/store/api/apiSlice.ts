import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { CharacterNormalized, TResponse } from '~/types';

export const BASE_URL = 'https://swapi.dev/api/people/';

type TransformedResponse = {
  count: number;
  next: number | null;
  previous: number | null;
  results: CharacterNormalized[];
};

export const swApi = createApi({
  reducerPath: 'charactersApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getCharacters: builder.query<
      TransformedResponse,
      { search: string; page: number }
    >({
      query: ({ search, page }) => ({
        url: '',
        params: { search: search || undefined, page },
      }),
      transformResponse: (response: TResponse): TransformedResponse => {
        const usersWithCheck: CharacterNormalized[] = response.results.map(
          (character) => {
            const urlParts = character.url.split('/').filter(Boolean);
            const id = parseInt(urlParts[urlParts.length - 1], 10);

            return {
              ...character,
              id,
              isChecked: false,
            };
          }
        );

        return {
          count: response.count,
          next: response.next,
          previous: response.previous,
          results: usersWithCheck,
        };
      },
    }),
    getDetails: builder.query<CharacterNormalized, string>({
      query: (id) => `${BASE_URL}${id}`,
    }),
  }),
});

export const { useGetCharactersQuery, useGetDetailsQuery } = swApi;
