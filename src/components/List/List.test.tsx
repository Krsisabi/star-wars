import { screen } from '@testing-library/react';
import results from '../../../tests/mockData';
import { render } from '@/tests/setup';
import { List } from './List';

describe('ListCards Component', () => {
  it('renders the specified number of cards', async () => {
    render(<List data={results} />);

    const cards = screen.getAllByRole('listitem');
    expect(cards).toHaveLength(results.length);
  });
});
