export const BASE_URL = 'https://swapi.dev/api/people/';

export async function baseFetch<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(BASE_URL + url, options);
  if (!res.ok) {
    throw new Error();
  }
  return res.json();
}
