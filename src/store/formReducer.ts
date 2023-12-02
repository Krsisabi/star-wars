import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import countries from '~/data/countries.json';

export type FormValues = {
  age: string;
  name: string;
  password: string;
  email: string;
  passwordConfirm: string;
  gender: string;
  acceptTerms: boolean;
  country: string;
  picture?: File;
};

export type Country = {
  name: string;
  code: string;
};

export interface FormState {
  formData: FormValues | null;
  formImage: string | null;
  countries: Country[];
}

const initialState: FormState = {
  formData: null,
  formImage: null,
  countries,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<FormValues>) => {
      state.formData = action.payload;
    },
    setFormImage: (state, action: PayloadAction<{ image: string | null }>) => {
      state.formImage = action.payload.image;
    },
    setCountries: (state, action: PayloadAction<Country[]>) => {
      state.countries = action.payload;
    },
  },
});

export const { setFormData, setFormImage, setCountries } = formSlice.actions;
export const selectFormData = (state: { form: FormState }) =>
  state.form.formData;
export const selectFormImage = (state: { form: FormState }) =>
  state.form.formImage;
export const selectCountries = (state: { form: FormState }) =>
  state.form.countries;
export default formSlice.reducer;
