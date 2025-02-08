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
});
