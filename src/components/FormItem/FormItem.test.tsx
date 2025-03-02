import { describe, it, expect } from 'vitest';
import { render, screen } from '@/tests/setup';
import FormItem from './FormItem';
import type { FormValues } from '~/store/formReducer';

const form: FormValues = {
  id: '1',
  type: 'Controlled form',
  name: 'Tim',
  age: 30,
  email: 'tim@example.com',
  password: 'Passw0rd!',
  passwordConfirm: 'Passw0rd!',
  gender: 'male',
  country: 'Cyprus',
  agreement: true,
  image: 'data:image/png;base64,AAAA',
};

describe('FormItem', () => {
  it('shows the submitted data', () => {
    render(<FormItem form={form} isHighlighted={false} />);

    expect(screen.getByText('Name: Tim')).toBeInTheDocument();
    expect(screen.getByText('Email: tim@example.com')).toBeInTheDocument();
    expect(screen.getByText('Gender: male')).toBeInTheDocument();
    expect(screen.getByText('Country: Cyprus')).toBeInTheDocument();
  });

  it('never renders the password', () => {
    render(<FormItem form={form} isHighlighted={false} />);

    expect(screen.queryByText(/Passw0rd!/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Password/i)).not.toBeInTheDocument();
  });

  it('marks the highlighted item', () => {
    const { container } = render(<FormItem form={form} isHighlighted={true} />);

    expect(container.querySelector('li')?.className).toMatch(/highlighted/);
  });
});
