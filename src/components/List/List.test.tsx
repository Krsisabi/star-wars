import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import results from '~/test/mockData';
import { render } from '~/test/setup';
import { List } from './List';

const mocks = vi.hoisted(() => {
  return {
    useSearchContext: vi.fn(),
  };
});

vi.mock('~/hooks', () => {
  return {
    useSearchContext: mocks.useSearchContext,
  };
});

describe('ListCards Component', () => {
  it('renders the specified number of cards', async () => {
    mocks.useSearchContext.mockReturnValue({ results });

    render(<List />);

    const cards = screen.getAllByRole('listitem');
    expect(cards).toHaveLength(results.length);
  });

  it('displays a message if no cards are present', () => {
    const results = {
      items: [],
    };

    mocks.useSearchContext.mockReturnValue({ results });

    render(<List />);

    const message = screen.getByText('Nothing found...');
    expect(message).toBeInTheDocument();
  });
});
