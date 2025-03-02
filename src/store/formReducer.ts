import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { countries } from '~/data/countries.ts';

export type FormValues = {
  id: string;
  type: string;
  age: number;
  name: string;
  password: string;
  email: string;
  passwordConfirm: string;
  gender: string;
  agreement: boolean;
  country: string;
  image?: string;
};

export type Country = {
  name: string;
  code: string;
};

export interface FormState {
  forms: FormValues[];
  countries: Country[];
}

const initialState: FormState = {
  countries,
  forms: [],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addFormData: (state, action: PayloadAction<FormValues>) => {
      state.forms.push(action.payload);
    },
  },
});

export const { addFormData } = formSlice.actions;
export const selectCountries = (state: { form: FormState }) =>
  state.form.countries;
export default formSlice.reducer;
