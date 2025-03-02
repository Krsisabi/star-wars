import { STORAGE_KEYS } from '~/utils/storage';

import html from '../index.html?raw';

const page = new DOMParser().parseFromString(html, 'text/html');
const script = page.querySelector('script:not([src])')!.textContent!;

const root = document.documentElement;

const themeFor = ({
  saved,
  systemDark,
}: {
  saved?: string;
  systemDark: boolean;
}) => {
  if (saved !== undefined) localStorage.setItem(STORAGE_KEYS.theme, saved);
  vi.stubGlobal('matchMedia', () => ({ matches: systemDark }));
  new Function(script)();
  return root.dataset.theme;
};

describe('the theme script in index.html', () => {
  afterEach(() => {
    localStorage.clear();
    vi.unstubAllGlobals();
    delete root.dataset.theme;
  });

  it('follows the system when nothing is saved', () => {
    expect(themeFor({ systemDark: true })).toBe('dark');
    expect(themeFor({ systemDark: false })).toBe('light');
  });

  it('prefers the saved choice over the system', () => {
    expect(themeFor({ saved: '"light"', systemDark: true })).toBe('light');
  });

  it('follows the system when the saved value is broken or unknown', () => {
    expect(themeFor({ saved: '{not json', systemDark: true })).toBe('dark');
    expect(themeFor({ saved: '"blue"', systemDark: true })).toBe('dark');
  });
});

describe('the head of index.html', () => {
  it('opens both kinds of connection to Fandom before the portraits are asked for', () => {
    const preconnects = page.querySelectorAll(
      'link[rel="preconnect"][href="https://static.wikia.nocookie.net"]'
    );

    expect(
      [...preconnects].map((link) => link.hasAttribute('crossorigin'))
    ).toEqual([false, true]);
  });

  it('keeps the referrer that Fandom asks of a portrait request', () => {
    expect(page.querySelector('meta[name="referrer"]')).toBeNull();
  });
});
