import { useAppDispatch, useAppSelector } from '~/hooks/redux';
import { deleteAllItems } from '~/store/charactersSlice';
import { fireEvent, render, screen } from '@/tests/setup';
import { Flyout } from './Flyout';

vi.mock('~/hooks/redux', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

describe('Flyout Component', () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    (useAppDispatch as vi.Mock).mockReturnValue(mockDispatch);
    (useAppSelector as vi.Mock).mockClear();
    mockDispatch.mockClear();
  });

  test('should render Flyout component when items are selected', () => {
    (useAppSelector as vi.Mock).mockReturnValue({
      item1: { name: 'Character 1' },
      item2: { name: 'Character 2' },
    });

    render(<Flyout />);

    const heading = screen.getByRole('heading', { name: /items selected/i });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('items selected: 2');

    const button = screen.getByRole('button', { name: /unselect all/i });
    expect(button).toBeInTheDocument();
  });

  test('should not render Flyout component when no items are selected', () => {
    (useAppSelector as vi.Mock).mockReturnValue({});

    render(<Flyout />);

    expect(screen.queryByRole('heading')).toBeNull();
    expect(screen.queryByRole('button', { name: /unselect all/i })).toBeNull();
  });

  test('should dispatch deleteAllItems action on clicking "Unselect all" button', () => {
    (useAppSelector as vi.Mock).mockReturnValue({
      item1: { name: 'Character 1' },
    });

    render(<Flyout />);

    const button = screen.getByRole('button', { name: /unselect all/i });
    fireEvent.click(button);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(deleteAllItems());
  });
});
