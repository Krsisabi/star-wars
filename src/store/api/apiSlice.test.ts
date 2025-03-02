// @vitest-environment node

import { makeStore } from '~/store/store';

import { swApi } from './apiSlice';

const responding = (body: object) =>
  vi.spyOn(globalThis, 'fetch').mockResolvedValue(
    new Response(JSON.stringify(body), {
      headers: { 'Content-Type': 'application/json' },
    })
  );

const requestedUrl = async (args: { search: string; page: number }) => {
  const fetchMock = responding({ count: 0, results: [] });
  const store = makeStore();

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

describe('getDetails', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('asks for the character and gives it the id from its url', async () => {
    const fetchMock = responding({
      name: 'C-3PO',
      url: 'https://swapi.dev/api/people/2/',
    });
    const store = makeStore();

    const { data } = await store.dispatch(
      swApi.endpoints.getDetails.initiate('2')
    );

    expect((fetchMock.mock.calls[0][0] as Request).url).toBe(
      'https://swapi.dev/api/people/2'
    );
    expect(data).toMatchObject({ name: 'C-3PO', id: 2 });
  });
});
