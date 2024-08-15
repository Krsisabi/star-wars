import { render, screen } from '@/tests/setup';
import { Error } from './Error';

describe('Error Component', () => {
  test('renders without crashing', () => {
    render(<Error />);
    const errorElement = screen.getByTestId('error-page');
    expect(errorElement).toBeInTheDocument();
  });

  test('displays correct title', () => {
    render(<Error />);
    const titleElement = screen.getByText('Oops!');
    expect(titleElement).toBeInTheDocument();
  });

  test('displays error message', () => {
    render(<Error />);
    const messageElement = screen.getByText(
      'Sorry, an expected error has occurred.'
    );
    expect(messageElement).toBeInTheDocument();
  });
});
