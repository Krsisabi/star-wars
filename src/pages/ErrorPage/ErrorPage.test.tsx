import { render, screen } from '~/test/render';

import { ErrorPage } from './ErrorPage';

describe('ErrorPage', () => {
  it('owns up to the error and leads back to the list', () => {
    render(<ErrorPage />);

    expect(screen.getByRole('heading')).toHaveTextContent('Oops!');
    expect(
      screen.getByText('Sorry, an unexpected error has occurred.')
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Back to characters' })
    ).toHaveAttribute('href', '/');
  });
});
