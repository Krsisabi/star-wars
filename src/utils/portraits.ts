import portraits from '~/data/portraits.json';

// Links to Wookieepedia pictures, built by scripts/fetch-portraits.mjs.
// Fandom serves them only to requests that carry a Referer, so the
// default referrer policy of <img> has to stay as it is.
const LINKS: Record<string, string> = portraits;

// Fandom scales on the fly and the width is a part of the path;
// it never scales a picture up.
export const portraitOf = (id: number, width: number) =>
  LINKS[id]?.replace(
    /scale-to-width-down\/\d+/,
    `scale-to-width-down/${width}`
  );
