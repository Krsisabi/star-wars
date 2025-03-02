import { render, screen } from '@/tests/setup';

import { NotFound } from './NotFound';

describe('NotFound', () => {
  it('says the page does not exist and leads home', () => {
    render(<NotFound />);

    expect(screen.getByRole('heading')).toHaveTextContent(/not found/i);
    expect(screen.getByRole('link', { name: 'Go to Home' })).toHaveAttribute(
      'href',
      '/'
    );
  });
});
