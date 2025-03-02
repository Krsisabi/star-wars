import { readStored, STORAGE_KEYS, writeStored } from './storage';

describe('storage', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('writes a value as JSON and reads it back', () => {
    writeStored(STORAGE_KEYS.searchValue, 'yoda');

    expect(localStorage.getItem(STORAGE_KEYS.searchValue)).toBe('"yoda"');
    expect(readStored(STORAGE_KEYS.searchValue)).toBe('yoda');
  });

  it('reads nothing where nothing is stored', () => {
    expect(readStored(STORAGE_KEYS.theme)).toBeUndefined();
  });

  it('reads nothing where the stored value is not JSON', () => {
    localStorage.setItem(STORAGE_KEYS.theme, '{not json');

    expect(readStored(STORAGE_KEYS.theme)).toBeUndefined();
  });
});
