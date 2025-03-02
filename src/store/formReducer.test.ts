import { describe, it, expect } from 'vitest';
import reducer, { addFormData, type FormValues } from './formReducer';
import { countries } from '~/data/countries';

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

describe('formReducer', () => {
  it('starts with no forms and a country list', () => {
    const state = reducer(undefined, { type: '@@INIT' });

    expect(state.forms).toEqual([]);
    expect(state.countries).toEqual(countries);
  });

  it('appends a submitted form', () => {
    const state = reducer(undefined, addFormData(form));

    expect(state.forms).toEqual([form]);
  });

  it('keeps submissions in order', () => {
    const second = { ...form, id: '2', name: 'Ann' };
    const state = reducer(
      reducer(undefined, addFormData(form)),
      addFormData(second)
    );

    expect(state.forms.map((item) => item.id)).toEqual(['1', '2']);
  });
});
