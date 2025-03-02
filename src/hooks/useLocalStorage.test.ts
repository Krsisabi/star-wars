import { act, renderHook } from '@testing-library/react';
import { STORAGE_KEYS, useLocalStorage } from './useLocalStorage';

describe('useLocalStorage', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('returns the initial value when nothing is stored', () => {
    const { result } = renderHook(() =>
      useLocalStorage(STORAGE_KEYS.theme, 'light')
    );
    expect(result.current[0]).toBe('light');
  });

  it('reads a stored value', () => {
    localStorage.setItem(STORAGE_KEYS.theme, JSON.stringify('dark'));
    const { result } = renderHook(() =>
      useLocalStorage(STORAGE_KEYS.theme, 'light')
    );
    expect(result.current[0]).toBe('dark');
  });

  it('falls back to the initial value when the stored one is not json', () => {
    localStorage.setItem(STORAGE_KEYS.theme, '{not json');
    const { result } = renderHook(() =>
      useLocalStorage(STORAGE_KEYS.theme, 'light')
    );
    expect(result.current[0]).toBe('light');
  });

  it('writes the new value to storage', () => {
    const { result } = renderHook(() =>
      useLocalStorage(STORAGE_KEYS.theme, 'light')
    );
    act(() => result.current[1]('dark'));
    expect(result.current[0]).toBe('dark');
    expect(localStorage.getItem(STORAGE_KEYS.theme)).toBe('"dark"');
  });
});
