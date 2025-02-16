import { vi } from 'vitest';
import { fireEvent, render, screen } from '@/tests/setup';
import { Flyout } from './Flyout';
import * as reduxHooks from '~/hooks/redux';

describe('Flyout Component', () => {
  test('should render Flyout component when items are selected', () => {
    vi.spyOn(reduxHooks, 'useAppSelector').mockReturnValue({
      item1: { name: 'Character 1' },
      item2: { name: 'Character 2' },
    });

    vi.spyOn(reduxHooks, 'useAppDispatch').mockReturnValue(vi.fn());
    render(<Flyout />);

    const heading = screen.getByRole('heading', { name: /items selected/i });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('items selected: 2');

    const button = screen.getByRole('button', { name: /unselect all/i });
    expect(button).toBeInTheDocument();
  });

  test('should dispatch deleteAllItems action on clicking "Unselect all" button', () => {
    vi.spyOn(reduxHooks, 'useAppSelector').mockReturnValue({
      item1: { name: 'Character 1' },
      item2: { name: 'Character 2' },
    });

    render(<Flyout />);

    const button = screen.getByRole('button', { name: /unselect all/i });
    fireEvent.click(button);
  });
});
