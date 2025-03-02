import { screen } from '@testing-library/react';
import { mockData } from '@/tests/mockData';
import { render } from '@/tests/setup';
import { List } from './List';

describe('ListCards Component', () => {
  it('renders the specified number of cards', async () => {
    render(<List data={mockData} />);

    const cards = screen.getAllByRole('listitem');
    expect(cards).toHaveLength(mockData.length);
  });
  it('renders "No such characters" message when data is an empty array', () => {
    render(<List data={[]} />);

    expect(screen.getByText(/no such/i)).toBeInTheDocument();
  });
  it('keeps the current page on screen while the next one loads', () => {
    render(<List data={mockData} isRefreshing />);

    expect(screen.getAllByRole('listitem')).toHaveLength(mockData.length);
    expect(screen.getByRole('list')).toHaveAttribute('aria-busy', 'true');
  });
});
