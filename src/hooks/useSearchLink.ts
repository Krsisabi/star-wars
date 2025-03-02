import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

// Links that keep the search and the page in the address: to another
// path, or to another page of the same list, which leaves an open details
// panel open.
export function useSearchLink() {
  const [searchParams] = useSearchParams();

  const toPath = useCallback(
    (pathname: string) => ({ pathname, search: searchParams.toString() }),
    [searchParams]
  );

  const toPage = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams);
      params.set('page', String(page));
      return { search: params.toString() };
    },
    [searchParams]
  );

  return { toPath, toPage };
}
