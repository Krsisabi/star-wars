import { render, screen } from '@/tests/setup';
import { mockData } from '@/tests/mockData';
import { ExportCSV } from './ExportCSV';

describe('ExportCSV Component', () => {
  test('renders the download button', () => {
    render(<ExportCSV data={[mockData[0]]} fileName="characters.csv" />);

    const button = screen.getByRole('button', { name: /download/i });
    expect(button).toBeInTheDocument();
  });
});
