import React, {
  ChangeEvent,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { baseFetch } from '~/api/baseFetch';
import { Character, TResponse } from '~/types';

type SearchContext = {
  searchValue: string;
  results: Character[];
  currentPage: number;
  totalCount: number;
  isLoading: boolean;
  error: Error | null;
  setSearchValue: Dispatch<SetStateAction<string>>;
  setSearchInputValue(e: ChangeEvent<HTMLInputElement>): void;
  setResults: Dispatch<SetStateAction<Character[]>>;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setTotalCount: Dispatch<SetStateAction<number>>;
  fetchList: (
    searchValue?: string,
    pageNumber?: number,
    options?: RequestInit
  ) => void;
};

const SearchContext = React.createContext<SearchContext | null>(null);

export const SearchProvider = ({ children }: PropsWithChildren) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get('search') ?? ''
  );
  const [results, setResults] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParams.get('page')) || 1
  );
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const setSearchInputValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setCurrentPage(1);
      setSearchValue(e.target.value);
    },
    []
  );

  const fetchList = useCallback(
    (searchValue?: string, pageNumber?: number, options?: RequestInit) => {
      searchValue && searchParams.set('search', searchValue);
      pageNumber && searchParams.set('page', pageNumber.toString());
      setSearchParams(searchParams);
      setIsLoading(true);

      baseFetch<TResponse>('?' + searchParams, options)
        .then(({ results, count }) => {
          setIsLoading(false);
          setResults(results);
          setTotalCount(count);
        })
        .catch(setError)
        .finally(() => setIsLoading(false));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <SearchContext.Provider
      value={{
        searchValue,
        results,
        currentPage,
        totalCount,
        isLoading,
        error,
        setSearchValue,
        setSearchInputValue,
        setResults,
        setCurrentPage,
        setTotalCount,
        fetchList,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = React.useContext(SearchContext);

  if (!context) {
    throw new Error(
      'useSearchContext must be used within SearchContextProvider'
    );
  }

  return context;
};
