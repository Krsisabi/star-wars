import { fetchItems } from '~/services/api';
import { vi } from 'vitest';

beforeAll(() => {
  globalThis.fetch = vi.fn();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('fetchItems', () => {
  it('fetches data successfully', async () => {
    const mockResponse = { results: [{ name: 'Luke Skywalker' }] };

    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockResponse),
    } as unknown as Response);

    const params = new URLSearchParams({ search: 'Luke' });
    const data = await fetchItems<{ results: { name: string }[] }>(params);

    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining('search=Luke')
    );
    expect(data).toEqual(mockResponse);
  });

  it('throws an error when the response is not ok', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      statusText: 'Not Found',
    } as unknown as Response);

    const params = new URLSearchParams({ search: 'Vader' });

    await expect(fetchItems(params)).rejects.toThrow(
      'Error fetching characters: Not Found'
    );
  });

  it('throws an error when fetch fails', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network Error'));

    const params = new URLSearchParams({ search: 'Leia' });

    await expect(fetchItems(params)).rejects.toThrow('Network Error');
  });
});
