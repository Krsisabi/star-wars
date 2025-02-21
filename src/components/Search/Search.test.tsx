import { Search } from '~/components/Search';
import { render, screen } from '@/tests/setup';
import userEvent from '@testing-library/user-event';

describe('Search Component', () => {
  it('renders the Search component', async () => {
    render(<Search />);
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');

    const user = userEvent.setup();
    await user.click(input);
    await user.keyboard('hello');
    await user.click(button);

    expect(input).toHaveValue('hello');
    expect(button).toHaveTextContent(/search/i);
  });
});
