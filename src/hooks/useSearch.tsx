import React, {
  ChangeEvent,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useState,
} from 'react';
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
  const [searchValue, setSearchValue] = useState(
    localStorage.getItem('searchValue') ?? ''
  );
  const [results, setResults] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const setSearchInputValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
    },
    []
  );

  const fetchList = useCallback(
    (searchValue?: string, pageNumber?: number, options?: RequestInit) => {
      setIsLoading(true);
      const searchParams = new URLSearchParams();
      searchValue && searchParams.append('search', searchValue);
      pageNumber && searchParams.append('page', pageNumber.toString());
      baseFetch<TResponse>('?' + searchParams, options)
        .then(({ results, count }) => {
          setIsLoading(false);
          setResults(results);
          setTotalCount(count);
        })
        .catch(setError);
    },
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
