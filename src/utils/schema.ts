import { boolean, number, object, ref, string, mixed } from 'yup';
import type { InferType, ValidationError } from 'yup';
import { countries } from '~/data/countries.ts';
import { IMAGE_TYPES, MAX_FILE_SIZE } from '~/constansts/constants';

export const schema = object({
  name: string()
    .required('Name is required')
    .matches(/^[A-Z]/, { message: 'First letter must be in uppercase' }),
  age: number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required('Age is required')
    .positive('Age must be positive'),
  gender: string().required('Gender is required'),
  country: string()
    .transform((value) => (value === '' ? undefined : value))
    .required('Country is required')
    .oneOf(
      countries.map((country) => country.name),
      'Country must be a valid country'
    ),
  image: mixed<FileList>()
    .transform((value: FileList) => (value[0] ? value : undefined))
    .required('Image is required')
    .test('File type', 'Image must be .png or .jpeg', (value: FileList) =>
      IMAGE_TYPES.includes(value[0]?.type)
    )
    .test(
      'File size',
      'Image size must be less than 1mb',
      (value: FileList) => value[0]?.size < MAX_FILE_SIZE
    ),
  email: string()
    .required('Email is required')
    .email('Email must be a valid email'),
  password: string()
    .required('Password is required')
    .test('strength', function (value: string = ''): true | ValidationError {
      const lowercaseRegex = /[a-z]/;
      const uppercaseRegex = /[A-Z]/;
      const numberRegex = /\d/;
      const symbolRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-]/;

      const errors = [];

      if (!lowercaseRegex.test(value))
        errors.push('One lowercase letter in latin');
      if (!uppercaseRegex.test(value))
        errors.push('One capital letter in latin');
      if (!numberRegex.test(value)) errors.push('One digit');
      if (!symbolRegex.test(value)) errors.push('One special character');

      if (errors.length > 0) {
        return this.createError({
          message: `password strength - ${
            4 - errors.length
          }/4: password must contain at least ${errors.join(', ')}`,
        });
      }
      return true;
    }),
  passwordConfirm: string()
    .oneOf([ref('password')], 'Passwords should match')
    .required('Confirm Password is required'),
  agreement: boolean()
    .defined()
    .isTrue('Terms and Conditions must be accepted'),
});

export type FormSchema = InferType<typeof schema>;
