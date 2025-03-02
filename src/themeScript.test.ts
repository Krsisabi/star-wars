import { STORAGE_KEYS } from '~/utils/storage';

import html from '../index.html?raw';

// The inline script in index.html decides the theme before the bundle
// loads. It is run here as the browser runs it.
const script = html.match(/<script>([\s\S]*?)<\/script>/)![1];

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
