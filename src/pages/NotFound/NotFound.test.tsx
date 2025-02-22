import { render, screen } from '@/tests/setup';
import { NotFound } from './NotFound';

describe('NotFound', () => {
  it('should rendering "404: Page Not Found"', () => {
    render(<NotFound />);

    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/not found/i);
  });
});
