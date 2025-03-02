import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { mockData } from '@/tests/mockData';
import { LocationProbe } from '@/tests/router';
import { Card, CardProps } from './Card';

const renderCard = (url: string, props: Partial<CardProps> = {}) =>
  render(
    <MemoryRouter initialEntries={[url]}>
      <Card
        character={mockData[0]}
        isSelected={false}
        onSelect={vi.fn()}
        {...props}
      />
      <LocationProbe />
    </MemoryRouter>
  );

describe('Card', () => {
  it('opens the details of its character, keeping the search and the page', async () => {
    renderCard('/?search=luke&page=2');

    const user = userEvent.setup();
    await user.click(screen.getByRole('link', { name: /luke/i }));

    expect(screen.getByTestId('location')).toHaveTextContent(
      '/details/1?search=luke&page=2'
    );
  });

  it('closes on a second click, keeping the search and the page', async () => {
    renderCard('/details/1?search=luke&page=2', { isActive: true });

    const link = screen.getByRole('link', { name: /luke/i });
    expect(link).toHaveAttribute('aria-current', 'true');

    const user = userEvent.setup();
    await user.click(link);

    expect(screen.getByTestId('location')).toHaveTextContent(
      '/?search=luke&page=2'
    );
  });

  it('reports the checkbox without opening the card', async () => {
    const onSelect = vi.fn();
    renderCard('/?page=1', { isSelected: true, onSelect });

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();

    const user = userEvent.setup();
    await user.click(checkbox);

    expect(onSelect).toHaveBeenCalledWith(mockData[0]);
    expect(screen.getByTestId('location')).toHaveTextContent('/?page=1');
  });
});
