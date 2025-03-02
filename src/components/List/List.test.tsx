import { mockData } from '~/test/mockData';
import { render, screen } from '~/test/render';

import { List } from './List';

describe('List', () => {
  it('shows a card per character', () => {
    render(<List data={mockData} />);

    const cards = screen.getAllByRole('listitem');
    expect(cards).toHaveLength(mockData.length);
  });
  it('says so when no character matches', () => {
    render(<List data={[]} />);

    expect(screen.getByText(/no such/i)).toBeInTheDocument();
  });
  it('keeps the current page on screen while the next one loads', () => {
    render(<List data={mockData} isRefreshing />);

    expect(screen.getAllByRole('listitem')).toHaveLength(mockData.length);
    expect(screen.getByRole('list')).toHaveAttribute('aria-busy', 'true');
  });
});
