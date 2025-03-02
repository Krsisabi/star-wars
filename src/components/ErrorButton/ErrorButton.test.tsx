import userEvent from '@testing-library/user-event';

import { render, screen } from '~/test/render';

import { ErrorButton } from './ErrorButton';

describe('ErrorButton', () => {
  it('throws on a click, for the error boundary to catch', async () => {
    const user = userEvent.setup();
    render(<ErrorButton />);

    await expect(
      user.click(screen.getByRole('button', { name: /generate error/i }))
    ).rejects.toThrow('Your bad =(');
  });
});
