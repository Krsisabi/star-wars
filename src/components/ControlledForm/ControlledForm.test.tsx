import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@/tests/setup';
import userEvent from '@testing-library/user-event';
import { ControlledForm } from './ControlledForm';

describe('ControlledForm', () => {
  it('gives every gender radio its own value', () => {
    render(<ControlledForm />);

    const radios = screen.getAllByRole('radio') as HTMLInputElement[];

    expect(radios.map((radio) => radio.value)).toEqual([
      'male',
      'female',
      'other',
    ]);
  });

  it('keeps both password fields masked', () => {
    const { container } = render(<ControlledForm />);

    expect(container.querySelectorAll('input[type="password"]')).toHaveLength(
      2
    );
  });

  it('reports a validation error as the user types', async () => {
    render(<ControlledForm />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText('Name:'), 'tim');

    await waitFor(() => {
      expect(
        screen.getByText('First letter must be in uppercase')
      ).toBeInTheDocument();
    });
  });

  it('keeps submit disabled while the form is invalid', async () => {
    render(<ControlledForm />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText('Email:'), 'not-an-email');

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled();
    });
  });
});
