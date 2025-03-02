import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@/tests/setup';
import userEvent from '@testing-library/user-event';
import { UncontrolledForm } from './UncontrolledForm';

describe('UncontrolledForm', () => {
  it('gives every gender radio its own value', () => {
    render(<UncontrolledForm />);

    const radios = screen.getAllByRole('radio') as HTMLInputElement[];

    expect(radios.map((radio) => radio.value)).toEqual([
      'male',
      'female',
      'other',
    ]);
  });

  it('submits the picked gender rather than "on"', async () => {
    const { container } = render(<UncontrolledForm />);
    const user = userEvent.setup();

    await user.click(screen.getByLabelText('Female'));

    const form = container.querySelector('form') as HTMLFormElement;
    expect(new FormData(form).get('gender')).toBe('female');
  });

  it('reports validation errors on an empty submit', async () => {
    render(<UncontrolledForm />);
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
    });
    expect(screen.getByText('Image is required')).toBeInTheDocument();
    expect(screen.getByText('Gender is required')).toBeInTheDocument();
  });
});
