import portraits from '~/data/portraits.json';

const LINKS: Record<string, string> = portraits;

export const portraitOf = (id: number, width: number) =>
  LINKS[id]?.replace(
    /scale-to-width-down\/\d+/,
    `scale-to-width-down/${width}`
  );
