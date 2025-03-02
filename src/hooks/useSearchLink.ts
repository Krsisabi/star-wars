import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

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
