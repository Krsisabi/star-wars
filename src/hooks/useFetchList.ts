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
  const { results, setResults, setTotalCount, totalCount, fetchList } =
    useSearchContext();

  useEffect(() => {
    fetchList(searchValue, pageNumber, options);
  }, [searchValue, pageNumber, options, setResults, setTotalCount, fetchList]);

  return { results, totalCount };
}
