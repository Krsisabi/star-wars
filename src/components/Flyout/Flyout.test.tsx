import { vi } from 'vitest';
import { fireEvent, render, screen } from '@/tests/setup';
import { mockData } from '@/tests/mockData';
import { Flyout } from './Flyout';
import { deleteAllItems } from '~/store/charactersSlice';
import * as reduxHooks from '~/hooks/redux';

const selected = [mockData[0], mockData[1]];

describe('Flyout Component', () => {
  test('should render Flyout component when items are selected', () => {
    vi.spyOn(reduxHooks, 'useAppSelector').mockReturnValue(selected);
    vi.spyOn(reduxHooks, 'useAppDispatch').mockReturnValue(vi.fn());

    render(<Flyout />);

    const heading = screen.getByRole('heading', { name: /items selected/i });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('items selected: 2');

    expect(
      screen.getByRole('button', { name: /unselect all/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /download/i })
    ).toBeInTheDocument();
  });

  test('should dispatch deleteAllItems action on clicking "Unselect all" button', () => {
    const dispatch = vi.fn();
    vi.spyOn(reduxHooks, 'useAppSelector').mockReturnValue(selected);
    vi.spyOn(reduxHooks, 'useAppDispatch').mockReturnValue(dispatch);

    render(<Flyout />);

    fireEvent.click(screen.getByRole('button', { name: /unselect all/i }));

    expect(dispatch).toHaveBeenCalledWith(deleteAllItems());
  });

  test('should render nothing when no items are selected', () => {
    vi.spyOn(reduxHooks, 'useAppSelector').mockReturnValue([]);
    vi.spyOn(reduxHooks, 'useAppDispatch').mockReturnValue(vi.fn());

    const { container } = render(<Flyout />);

    expect(container).toBeEmptyDOMElement();
  });
});
