import { vi } from 'vitest';
import { fireEvent, render, screen } from '@/tests/setup';
import { mockData } from '@/tests/mockData';
import { ExportCSV } from './ExportCSV';

describe('ExportCSV Component', () => {
  test('renders the download button', () => {
    render(<ExportCSV data={[mockData[0]]} fileName="characters.csv" />);

    const button = screen.getByRole('button', { name: /download/i });
    expect(button).toBeInTheDocument();
  });

  test('builds a csv with a header row and one row per character', () => {
    let csv = '';
    vi.spyOn(globalThis, 'Blob').mockImplementation((parts) => {
      csv = ((parts as string[]) || []).join('');
      return {} as Blob;
    });
    URL.createObjectURL = vi.fn(() => 'blob:mock');
    URL.revokeObjectURL = vi.fn();

    render(<ExportCSV data={[mockData[0], mockData[1]]} fileName="2.csv" />);
    fireEvent.click(screen.getByRole('button', { name: /download/i }));

    const lines = csv.split('\n');
    expect(lines[0]).toBe('id;Name;Skin color;Eye color;Birth year;Gender;URL');
    expect(lines).toHaveLength(3);
    expect(lines[1]).toBe(
      '1;Luke Skywalker;fair;blue;19BBY;male;https://swapi.dev/api/people/1/'
    );

    vi.restoreAllMocks();
  });
});
