import { BASE_URL } from '~/constants';

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
