import { render, screen } from '@/tests/setup';
import userEvent from '@testing-library/user-event';
import { ErrorButton } from './ErrorButton';

describe('ErrorButton', () => {
  it('should throw an error when clicked', async () => {
    render(<ErrorButton />);

    const button = screen.getByText(/Generate error/i);

    // Настроим userEvent для клика
    const user = userEvent.setup();

    // Проверяем, что при клике на кнопку ошибка выбрасывается
    await expect(async () => {
      await user.click(button);
    }).rejects.toThrow('Your bad =(');
  });
});
