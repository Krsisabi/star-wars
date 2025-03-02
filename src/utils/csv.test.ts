import { toCsv } from './csv';

describe('toCsv', () => {
  it('puts a row on a line, its cells apart by semicolons', () => {
    expect(
      toCsv([
        ['id', 'Name'],
        ['1', 'Luke Skywalker'],
      ])
    ).toBe('id;Name\n1;Luke Skywalker');
  });

  it('quotes a cell with a semicolon, a quote or a line break', () => {
    expect(toCsv([['a;b', 'say "hi"', 'two\nlines']])).toBe(
      '"a;b";"say ""hi""";"two\nlines"'
    );
  });
});
