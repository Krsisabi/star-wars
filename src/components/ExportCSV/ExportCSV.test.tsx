import { downloadFile } from '~/utils/download';
import { mockData } from '@/tests/mockData';
import { fireEvent, render, screen } from '@/tests/setup';

import { ExportCSV } from './ExportCSV';

vi.mock('~/utils/download', () => ({ downloadFile: vi.fn() }));

describe('ExportCSV', () => {
  it('downloads a header row and a row per character', () => {
    render(<ExportCSV data={[mockData[0], mockData[1]]} fileName="2.csv" />);

    fireEvent.click(screen.getByRole('button', { name: /download/i }));

    const [csv, fileName, type] = vi.mocked(downloadFile).mock.calls[0];
    const lines = csv.split('\n');
    expect(lines).toHaveLength(3);
    expect(lines[0]).toBe('id;Name;Skin color;Eye color;Birth year;Gender;URL');
    expect(lines[1]).toBe(
      '1;Luke Skywalker;fair;blue;19BBY;male;https://swapi.dev/api/people/1/'
    );
    expect(fileName).toBe('2.csv');
    expect(type).toBe('text/csv');
  });
});
