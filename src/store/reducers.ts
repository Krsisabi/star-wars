import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

export interface FormState {
  formData: FormValues | null;
}

const initialState: FormState = {
  formData: null,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<FormValues>) => {
      state.formData = action.payload;
    },
  },
});

export const { setFormData } = formSlice.actions;
export const selectFormData = (state: { form: FormState }) =>
  state.form.formData;
export default formSlice.reducer;
