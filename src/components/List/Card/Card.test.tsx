import userEvent from '@testing-library/user-event';

import { mockData } from '~/test/mockData';
import { currentLocation, render, screen } from '~/test/render';

import type { CardProps } from './Card';
import { Card } from './Card';

const renderCard = (url: string, props: Partial<CardProps> = {}) =>
  render(
    <Card
      character={mockData[0]}
      isSelected={false}
      onSelect={vi.fn()}
      {...props}
    />,
    { history: [url] }
  );

describe('Card', () => {
  it('opens the details of its character, keeping the search and the page', async () => {
    renderCard('/?search=luke&page=2');

    const user = userEvent.setup();
    await user.click(screen.getByRole('link', { name: /luke/i }));

    expect(currentLocation()).toHaveTextContent(
      '/details/1?search=luke&page=2'
    );
  });

  it('closes on a second click, keeping the search and the page', async () => {
    renderCard('/details/1?search=luke&page=2', { isActive: true });

    const link = screen.getByRole('link', { name: /luke/i });
    expect(link).toHaveAttribute('aria-current', 'true');

    const user = userEvent.setup();
    await user.click(link);

    expect(currentLocation()).toHaveTextContent('/?search=luke&page=2');
  });

  it('reports the checkbox without opening the card', async () => {
    const onSelect = vi.fn();
    renderCard('/?page=1', { isSelected: true, onSelect });

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();

    const user = userEvent.setup();
    await user.click(checkbox);

    expect(onSelect).toHaveBeenCalledWith(mockData[0]);
    expect(currentLocation()).toHaveTextContent('/?page=1');
  });
});
