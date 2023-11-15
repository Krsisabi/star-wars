import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import items from '~/test/mockData';
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
    mocks.useSearchContext.mockReturnValue(items);

    render(<List />);

    const cards = await screen.findAllByTestId('listItem');
    expect(cards).toHaveLength(items.length);
  });

  it('calls onClickItem with the right argument when an item is clicked', () => {
    mocks.useSearchContext.mockReturnValue({ items });

    const onClickItem = vi.fn();
    const { getAllByTestId } = render(<List />);

    const listItems = getAllByTestId('listItem');
    fireEvent.click(listItems[0]);

    expect(onClickItem).toHaveBeenCalledWith(1);
  });
});
