import { describe, it, expect } from 'vitest';
import { schema } from './schema';

const pngFile = new File(['x'], 'avatar.png', { type: 'image/png' });

const validValues = {
  name: 'Tim',
  age: 30,
  email: 'tim@example.com',
  password: 'Passw0rd!',
  passwordConfirm: 'Passw0rd!',
  gender: 'male',
  country: 'Cyprus',
  agreement: true,
  image: [pngFile],
};

const messagesOf = async (values: unknown) => {
  try {
    await schema.validate(values, { abortEarly: false });
    return [];
  } catch (error) {
    return (error as { errors: string[] }).errors;
  }
};

describe('schema', () => {
  it('accepts a fully filled form', async () => {
    expect(await messagesOf(validValues)).toEqual([]);
  });

  it('reports a missing image instead of throwing', async () => {
    expect(await messagesOf({ ...validValues, image: [] })).toContain(
      'Image is required'
    );
  });

  it('reports an unset image field instead of throwing', async () => {
    expect(await messagesOf({ ...validValues, image: undefined })).toContain(
      'Image is required'
    );
  });

  it('reports a missing image when the file input was left empty', async () => {
    // an untouched <input type="file"> still yields a File through FormData
    const empty = new File([], '', { type: '' });
    expect(await messagesOf({ ...validValues, image: [empty] })).toContain(
      'Image is required'
    );
  });

  it('rejects a file that is not png or jpeg', async () => {
    const txt = new File(['x'], 'notes.txt', { type: 'text/plain' });
    expect(await messagesOf({ ...validValues, image: [txt] })).toContain(
      'Image must be .png or .jpeg'
    );
  });

  it('requires a gender to be picked', async () => {
    expect(await messagesOf({ ...validValues, gender: '' })).toContain(
      'Gender is required'
    );
  });

  it('requires the name to start with a capital letter', async () => {
    expect(await messagesOf({ ...validValues, name: 'tim' })).toContain(
      'First letter must be in uppercase'
    );
  });

  it('calls an empty name missing rather than lowercase', async () => {
    const messages = await messagesOf({ ...validValues, name: '' });

    expect(messages).toContain('Name is required');
    expect(messages).not.toContain('First letter must be in uppercase');
  });

  it('requires both passwords to match', async () => {
    expect(
      await messagesOf({ ...validValues, passwordConfirm: 'Other1!' })
    ).toContain('Passwords should match');
  });

  it('requires the country to be a known one', async () => {
    expect(await messagesOf({ ...validValues, country: 'Atlantis' })).toContain(
      'Country must be a valid country'
    );
  });
});
