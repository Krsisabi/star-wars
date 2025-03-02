import { render, screen } from '~/test/render';

import { MissingPage } from './MissingPage';

describe('MissingPage', () => {
  it('names the missing page and leads to the first one of the same search', () => {
    render(<MissingPage page={12} />, {
      history: ['/details/1?search=luke&page=12'],
    });

    expect(screen.getByRole('heading')).toHaveTextContent(
      "Page 12 doesn't exist"
    );
    expect(screen.getByRole('link', { name: 'Go to page 1' })).toHaveAttribute(
      'href',
      '/details/1?search=luke&page=1'
    );
  });
});
