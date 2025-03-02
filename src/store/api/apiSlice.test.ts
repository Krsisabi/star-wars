// @vitest-environment node
// Node's own fetch, Request and AbortSignal: under jsdom the request
// is rejected before it reaches fetch, and there is nothing to inspect.
import { configureStore } from '@reduxjs/toolkit';

import { swApi } from './apiSlice';

const requestedUrl = async (args: { search: string; page: number }) => {
  const fetchMock = vi
    .spyOn(globalThis, 'fetch')
    .mockResolvedValue(
      new Response(
        JSON.stringify({ count: 0, next: null, previous: null, results: [] }),
        { headers: { 'Content-Type': 'application/json' } }
      )
    );
  const store = configureStore({
    reducer: { [swApi.reducerPath]: swApi.reducer },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(swApi.middleware),
  });

  await store.dispatch(swApi.endpoints.getCharacters.initiate(args));

  return (fetchMock.mock.calls[0][0] as Request).url;
};

describe('getCharacters', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('asks for the given page of the search results', async () => {
    expect(await requestedUrl({ search: 'a', page: 2 })).toBe(
      'https://swapi.dev/api/people/?search=a&page=2'
    );
  });

  it('leaves the search out when there is none', async () => {
    expect(await requestedUrl({ search: '', page: 3 })).toBe(
      'https://swapi.dev/api/people/?page=3'
    );
  });

  it('encodes the search term', async () => {
    expect(await requestedUrl({ search: 'r2 d2&x', page: 1 })).toBe(
      'https://swapi.dev/api/people/?search=r2+d2%26x&page=1'
    );
  });
});
