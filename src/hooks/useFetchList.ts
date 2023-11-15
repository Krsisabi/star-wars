import { useEffect } from 'react';
import { useSearchContext } from './useSearch';

type useFetchListProps = {
  searchValue: string;
  pageNumber?: number;
  options?: RequestInit;
};

export function useFetchList({
  searchValue,
  pageNumber,
  options,
}: useFetchListProps) {
  const { results, totalCount, fetchList } = useSearchContext();

  useEffect(() => {
    fetchList(searchValue, pageNumber, options);
  }, [searchValue, pageNumber, options, fetchList]);

  return { results, totalCount };
}
