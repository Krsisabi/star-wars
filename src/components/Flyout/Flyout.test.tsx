import { makeStore } from '~/store/store';
import { mockData } from '~/test/mockData';
import { fireEvent, render, screen } from '~/test/render';

import { Flyout } from './Flyout';

const withSelection = () =>
  makeStore({ selection: [mockData[0], mockData[1]] });

describe('Flyout', () => {
  it('counts the selection and offers to unselect or download it', () => {
    render(<Flyout />, { store: withSelection() });

    expect(screen.getByRole('status')).toHaveTextContent('2 items selected');
    expect(
      screen.getByRole('button', { name: /unselect all/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /download/i })
    ).toBeInTheDocument();
  });

  it('unselects everything at once', () => {
    const { store, container } = render(<Flyout />, {
      store: withSelection(),
    });

    fireEvent.click(screen.getByRole('button', { name: /unselect all/i }));

    expect(store.getState().selection).toEqual([]);
    expect(container).toBeEmptyDOMElement();
  });

  it('shows nothing when nothing is selected', () => {
    const { container } = render(<Flyout />);

    expect(container).toBeEmptyDOMElement();
  });
});
