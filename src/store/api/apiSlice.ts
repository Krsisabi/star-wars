import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Character, TResponse } from '~/types';

export const BASE_URL = 'https://swapi.dev/api/people/';

export const swApi = createApi({
  reducerPath: 'charactersApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getCharacters: builder.query<TResponse, { name: string; page?: number }>({
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
    }),
    getDetails: builder.query<Character, string>({
      query: (id) => `${BASE_URL}${id}`,
    }),
  }),
});

export const {
  useGetCharactersQuery,
  useLazyGetCharactersQuery,
  useGetDetailsQuery,
} = swApi;
