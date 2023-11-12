import React, {
  ChangeEvent,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useState,
} from 'react';
import { Character } from '~/types';

type SearchContext = {
  searchValue: string;
  results: Character[];
  currentPage: number;
  totalCount: number;
  setSearchValue: Dispatch<SetStateAction<string>>;
  setSearchInputValue(e: ChangeEvent<HTMLInputElement>): void;
  setResults: Dispatch<SetStateAction<Character[]>>;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setTotalCount: Dispatch<SetStateAction<number>>;
};

const SearchContext = React.createContext<SearchContext | null>(null);

export const SearchProvider = ({ children }: PropsWithChildren) => {
  const [searchValue, setSearchValue] = useState(
    localStorage.getItem('searchValue') ?? ''
  );
  const [results, setResults] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const setSearchInputValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
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
        setSearchValue,
        setSearchInputValue,
        setResults,
        setCurrentPage,
        setTotalCount,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = React.useContext(SearchContext);

  if (!context) {
    throw new Error('useGlobalState must be used within GlobalStateProvider');
  }

  return context;
};
