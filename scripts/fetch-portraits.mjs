// Builds src/data/portraits.json: SWAPI character id → portrait link.
//
// SWAPI has no pictures. akabab/starwars-api numbers its characters the
// same way and knows each one's Wookieepedia page, but a quarter of its
// image links have gone stale, so the picture itself is asked from the
// Fandom API: the page's lead image, scaled down. Only links are stored;
// the pictures stay on Fandom.
//
// Run: node scripts/fetch-portraits.mjs
import { writeFile } from 'node:fs/promises';

const WIDTH = 320;
const OUTPUT = new URL('../src/data/portraits.json', import.meta.url);
const HEADERS = { 'User-Agent': 'star-wars-portraits-script' };

const getJson = async (url) => {
  const response = await fetch(url, { headers: HEADERS });
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return response.json();
};

const characters = await getJson(
  'https://akabab.github.io/starwars-api/api/all.json'
);

const titleOf = (wiki) =>
  decodeURIComponent(new URL(wiki).pathname.replace('/wiki/', '')).replace(
    /_/g,
    ' '
  );

// Wookieepedia redirects Darth Vader to Anakin Skywalker, whose picture
// is the Jedi before the armour; the armour page shows the Sith.
const OVERRIDES = { 4: "Darth Vader's armor" };

const titles = new Map(
  characters.map((c) => [c.id, OVERRIDES[c.id] ?? titleOf(c.wiki)])
);

// The API answers for up to 50 titles at a time and reports how it
// normalised and redirected them; the chain leads back to our titles.
const thumbnails = new Map();
const unique = [...new Set(titles.values())];
for (let i = 0; i < unique.length; i += 50) {
  const batch = unique.slice(i, i + 50);
  const params = new URLSearchParams({
    action: 'query',
    prop: 'pageimages',
    piprop: 'thumbnail',
    pithumbsize: String(WIDTH),
    redirects: '1',
    format: 'json',
    formatversion: '2',
    titles: batch.join('|'),
  });
  const { query } = await getJson(
    `https://starwars.fandom.com/api.php?${params}`
  );
  const renamed = new Map(
    [...(query.normalized ?? []), ...(query.redirects ?? [])].map((r) => [
      r.from,
      r.to,
    ])
  );
  const images = new Map(
    query.pages.map((page) => [page.title, page.thumbnail?.source])
  );
  for (const title of batch) {
    let resolved = title;
    while (renamed.has(resolved)) resolved = renamed.get(resolved);
    thumbnails.set(title, images.get(resolved));
  }
}

const portraits = {};
const missing = [];
for (const [id, title] of [...titles].sort(([a], [b]) => a - b)) {
  const source = thumbnails.get(title);
  if (source) portraits[id] = source;
  else missing.push(`${id} ${title}`);
}

await writeFile(OUTPUT, `${JSON.stringify(portraits, null, 2)}\n`, 'utf-8');
console.log(`${Object.keys(portraits).length} portraits written`);
if (missing.length) console.log(`no image: ${missing.join(', ')}`);
