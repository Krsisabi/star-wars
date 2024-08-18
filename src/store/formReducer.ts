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
  formData: FormValues | null;
  formImage: string | null;
  countries: Country[];
}

const initialState: FormState = {
  formData: null,
  formImage: null,
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
    setFormImage: (state, action: PayloadAction<{ image: string | null }>) => {
      state.formImage = action.payload.image;
    },
    setCountries: (state, action: PayloadAction<Country[]>) => {
      state.countries = action.payload;
    },
  },
});

export const { addFormData, setFormImage, setCountries } = formSlice.actions;
export const selectFormData = (state: { form: FormState }) =>
  state.form.formData;
export const selectFormImage = (state: { form: FormState }) =>
  state.form.formImage;
export const selectCountries = (state: { form: FormState }) =>
  state.form.countries;
export default formSlice.reducer;
