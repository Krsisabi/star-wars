import { mockData } from '@/tests/mockData';
import { initials, summary, swatches, withUnit } from './character';

describe('character helpers', () => {
  it('builds a monogram from any kind of name', () => {
    expect(initials('Luke Skywalker')).toBe('LS');
    expect(initials('Beru Whitesun lars')).toBe('BL');
    expect(initials('C-3PO')).toBe('C3');
    expect(initials('R2-D2')).toBe('R2');
    expect(initials('Yoda')).toBe('YO');
  });

  it('leaves unknown facts out of the summary', () => {
    expect(summary(mockData[0])).toBe('male · 19BBY');
    expect(
      summary({ ...mockData[0], gender: 'n/a', birth_year: 'unknown' })
    ).toBe('');
  });

  it('adds a unit to numbers only', () => {
    expect(withUnit('1,358', 'kg')).toBe('1,358 kg');
    expect(withUnit('unknown', 'kg')).toBe('unknown');
  });

  it('finds a swatch for every colour in the value', () => {
    expect(swatches('white, blue')).toHaveLength(2);
    expect(swatches('mottled green')).toEqual(swatches('green'));
    expect(swatches('n/a')).toEqual([]);
  });
});
