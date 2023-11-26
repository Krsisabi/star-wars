import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '~/test/setup';
import { data } from '~/test/mockData';
import { Details } from '~/components/Details';
import { Card } from './Card';

vi.mock('~/api/baseFetch', () => ({
  baseFetch: vi.fn((id) => Promise.resolve(data[id - 1])),
}));

afterEach(() => {
  vi.clearAllMocks();
});

describe('List Item Component', () => {
  it('the card component renders the relevant card data', async () => {
    const cardData = data[0];

    render(<Card {...cardData} />);

    expect(screen.getByText(cardData.name)).toBeInTheDocument();
  });

  it('clicking on a card opens a detailed card component', async () => {
    const user = userEvent.setup();

    render(<Details />);

    await user.click(screen.getByRole('link'));
    const closeButton = await screen.findByRole('link', { name: 'X' });

    expect(closeButton).toBeInTheDocument();
  });
});
