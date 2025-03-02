const SEPARATOR = ';';

// A cell holding the separator, a quote or a line break goes in quotes,
// with its own quotes doubled.
const escapeCell = (value: string) =>
  /[";\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;

export const toCsv = (rows: string[][]) =>
  rows.map((row) => row.map(escapeCell).join(SEPARATOR)).join('\n');
