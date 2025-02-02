const BASE_URL = 'https://swapi.dev/api/people/';

export async function fetchItems<T>(character: string): Promise<T> {
  try {
    const url = new URL(BASE_URL);

    if (character) {
      url.searchParams.append('search', character);
    }

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
