const SEPARATOR = ';';

const escapeCell = (value: string) =>
  /[";\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;

export const toCsv = (rows: string[][]) =>
  rows.map((row) => row.map(escapeCell).join(SEPARATOR)).join('\n');
