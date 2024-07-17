import { screen } from '@testing-library/react';
import { render } from '@/tests/setup';
import data from '@/tests/mockData';
import { Card } from './Card';

describe('List Item Component', () => {
  it('the card component renders the relevant card data', async () => {
    const cardData = data[0];

    render(<Card {...cardData} />);

    expect(screen.getByText(cardData.name)).toBeInTheDocument();
  });
});
