// Builds the sky's pictures in src/assets from stars.svg.
//
// The night twinkles in groups: a fifth of the stars, the brightest, leave
// the tile and go in three groups onto layers of their own, and each layer
// fades as a whole. Fading a layer costs the browser nothing; stars fading
// one by one inside the SVG made it repaint the whole sky every frame.
//
// The day has haze, not clouds: fractal noise stretched sideways gives thin
// streaks, soft bands decide where they are. The bands keep clear of the
// strip's left and right edges, so it repeats without a seam.
//
// Run: node scripts/make-sky.mjs
import { readFile, rename, writeFile } from 'node:fs/promises';

const ASSETS = new URL('../src/assets/', import.meta.url);
const TWINKLING = 20;
const GROUPS = 3;

// Written whole and then moved in place: the dev server on Windows reads
// a file caught half-written as empty and keeps serving it so.
const write = async (name, content) => {
  const target = new URL(name, ASSETS);
  const draft = new URL(`${name}.tmp`, ASSETS);
  await writeFile(draft, content, 'utf-8');
  await rename(draft, target);
};

const tile = await readFile(new URL('stars.svg', ASSETS), 'utf-8');
const head = tile.slice(0, tile.indexOf('>') + 1);
const stars = tile.match(/<circle [^>]*\/>/g);
const number = (star, name, fallback) =>
  Number(star.match(new RegExp(`${name}="([^"]+)"`))?.[1] ?? fallback);

const brightness = (star) => number(star, 'r') * number(star, 'opacity', 1);
const twinkling = new Set(
  stars
    .map((star, i) => i)
    .sort((a, b) => brightness(stars[b]) - brightness(stars[a]))
    .slice(0, TWINKLING)
);

const svg = (circles) => `${head}${circles.join('')}</svg>\n`;
await write('stars-base.svg', svg(stars.filter((_, i) => !twinkling.has(i))));

const groups = Array.from({ length: GROUPS }, () => []);
[...twinkling]
  .sort((a, b) => a - b)
  .forEach((i, n) => groups[n % GROUPS].push(stars[i]));
for (const [n, group] of groups.entries()) {
  await write(`stars-twinkle-${n + 1}.svg`, svg(group));
}

const haze = (width, frequency, seed, bands) => {
  for (const [cx, , rx] of bands) {
    if (cx - rx < 200 || cx + rx > width - 200) {
      throw new Error(`a band at ${cx} would cross the strip's edge`);
    }
  }
  const shapes = bands
    .map(
      ([cx, cy, rx, ry]) =>
        `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"/>`
    )
    .join('');
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="1000" viewBox="0 0 ${width} 1000">` +
    `<filter id="haze" filterUnits="userSpaceOnUse" x="0" y="0" width="${width}" height="1000" color-interpolation-filters="sRGB">` +
    `<feTurbulence type="fractalNoise" baseFrequency="${frequency}" numOctaves="5" seed="${seed}" result="noise"/>` +
    // white everywhere, opaque only where the noise is dense
    `<feColorMatrix in="noise" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  2.4 0 0 0 -1.0" result="wisps"/>` +
    `<feGaussianBlur in="SourceGraphic" stdDeviation="60" result="bands"/>` +
    `<feComposite in="wisps" in2="bands" operator="in"/>` +
    `</filter><g fill="#fff" filter="url(#haze)">${shapes}</g></svg>\n`
  );
};

// Most of it in the top third, where the header leaves the sky open; a
// little lower, for the gaps between cards and under the glass.
await write(
  'haze-far.svg',
  haze(2400, '0.0028 0.011', 7, [
    [650, 110, 400, 70],
    [1550, 80, 420, 60],
    [1100, 300, 320, 55],
    [1850, 430, 250, 50],
    [560, 620, 300, 50],
  ])
);
await write(
  'haze-near.svg',
  haze(2800, '0.0018 0.008', 23, [
    [760, 150, 460, 90],
    [1800, 90, 400, 70],
    [1350, 430, 360, 70],
    [2280, 300, 300, 60],
    [640, 760, 330, 60],
  ])
);

console.log(
  `${twinkling.size} of ${stars.length} stars twinkle, in groups of`,
  groups.map((group) => group.length).join(', ')
);
