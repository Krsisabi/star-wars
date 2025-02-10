import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { CharacterNormilized, TResponse } from '~/types';

export const BASE_URL = 'https://swapi.dev/api/people/';

type TransformedResponse = {
  count: number;
  next: number | null;
  previous: number | null;
  results: CharacterNormilized[];
};

export const swApi = createApi({
  reducerPath: 'charactersApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getCharacters: builder.query<
      TransformedResponse,
      { name: string; page?: number }
    >({
      query: ({ name, page }) => {
        const searchParams = new URLSearchParams(window.location.search);
        const currentPage = page ?? (Number(searchParams.get('page')) || 1);
        searchParams.set('page', currentPage.toString());

        if (name) {
          searchParams.set('search', name);
          searchParams.set('page', '1');
        }
        return `?${searchParams.toString()}`;
      },
      transformResponse: (response: TResponse): TransformedResponse => {
        const usersWithCheck: CharacterNormilized[] = response.results.map(
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
    getDetails: builder.query<CharacterNormilized, string>({
      query: (id) => `${BASE_URL}${id}`,
    }),
  }),
});

export const {
  useGetCharactersQuery,
  useLazyGetCharactersQuery,
  useGetDetailsQuery,
} = swApi;
