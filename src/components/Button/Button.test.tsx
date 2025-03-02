import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from './Button';

describe('Button', () => {
  it('is named by its label, with the icon hidden from screen readers', () => {
    render(<Button icon="download" label="Download" />);

    const button = screen.getByRole('button', { name: 'Download' });
    expect(button).toHaveAttribute('type', 'button');
    expect(button.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });

  it('keeps its name and its job when only the icon shows', async () => {
    const onClick = vi.fn();
    render(
      <Button icon="cross" label="Close details" iconOnly onClick={onClick} />
    );

    await userEvent.click(
      screen.getByRole('button', { name: 'Close details' })
    );

    expect(onClick).toHaveBeenCalledOnce();
  });
});
