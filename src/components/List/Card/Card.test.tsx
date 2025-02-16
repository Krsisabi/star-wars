import { screen } from '@testing-library/react';
import { render } from '@/tests/setup';
import { mockData } from '@/tests/mockData';
import { Card } from './Card';

describe('List Item Component', () => {
  it('the card component renders the relevant card data', async () => {
    const cardData = mockData[0];

    render(
      <Card character={cardData} onSelect={() => {}} isSelected={false} />
    );

    expect(screen.getByText(cardData.name)).toBeInTheDocument();
  });
});
