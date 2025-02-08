export const BASE_URL = 'https://swapi.dev/api/people/';

export async function fetchItems<T>(params: URLSearchParams): Promise<T> {
  try {
    const url = new URL(BASE_URL);
    url.search = params.toString();

    const res = await fetch(url.toString());
    if (!res.ok) {
      throw new Error(`Error fetching characters: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
