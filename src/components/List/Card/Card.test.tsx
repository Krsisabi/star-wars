import { render, screen } from '@/tests/setup';
import { mockData } from '@/tests/mockData';
import userEvent from '@testing-library/user-event';
import { Card } from './Card';

describe('Card', () => {
  it('should card clicked', async () => {
    const setActiveElement = vi.fn();
    const onSelect = vi.fn();

    render(
      <Card
        character={mockData[0]}
        activeElement={'1'}
        setActiveElement={setActiveElement}
        isSelected={true}
        onSelect={onSelect}
      />
    );

    const card = screen.getByText(/luke/i);
    const checkbox = screen.getByRole('checkbox');

    const user = userEvent.setup();
    await user.click(card);
    await user.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  it('should card clicked checkbox', async () => {
    const setActiveElement = vi.fn();
    const onSelect = vi.fn();

    render(
      <Card
        character={mockData[0]}
        activeElement={'1'}
        setActiveElement={setActiveElement}
        isSelected={false}
        onSelect={onSelect}
      />
    );

    const card = screen.getByText(/luke/i);
    const checkbox = screen.getByRole('checkbox');

    const user = userEvent.setup();
    await user.click(card);
    await user.click(checkbox);

    expect(checkbox).not.toBeChecked();
  });
});
