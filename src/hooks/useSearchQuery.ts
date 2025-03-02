import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import { readStored, STORAGE_KEYS, writeStored } from '~/utils/storage';

const toPage = (value: string | null) => {
  const page = Number(value);
  return Number.isInteger(page) && page > 0 ? page : 1;
};

const readStoredSearch = () => {
  const stored = readStored(STORAGE_KEYS.searchValue);
  return typeof stored === 'string' ? stored.trim() : '';
};

const firstPageOf = (term: string) => {
  const params = new URLSearchParams();
  if (term) params.set('search', term);
  params.set('page', '1');
  return params;
};

// The address is the only source of truth for the search term and the page.
// Local storage just remembers the last submitted term between visits: it is
// written on submit and read only when the address has no search in it.
export function useSearchQuery() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('search') ?? '';
  const page = toPage(searchParams.get('page'));

  const storedSearch = searchParams.has('search') ? '' : readStoredSearch();
  const restoreTo = storedSearch ? `?${firstPageOf(storedSearch)}` : null;

  const submitSearch = useCallback(
    (value: string) => {
      const term = value.trim();
      writeStored(STORAGE_KEYS.searchValue, term);
      setSearchParams(firstPageOf(term));
    },
    [setSearchParams]
  );

  return { search, page, restoreTo, submitSearch };
}
