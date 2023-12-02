import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  setFormData,
  setFormImage,
  selectFormImage,
  selectCountries,
} from '~/store/formReducer';
import { FormValues } from '~/store/formReducer';
import { schema } from '~/utils/schema';
import styles from './ControlledForm.module.scss';

interface IValidationError {
  path?: keyof FormValues;
  message: string;
}

interface IValidationErrors {
  inner: IValidationError[];
}

export const ControlledForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formImage = useSelector(selectFormImage);
  const countries = useSelector(selectCountries);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: async (data: FormValues) => {
      try {
        await schema.validate(data, { abortEarly: false });
        return {
          values: data,
          errors: {},
        };
      } catch (error) {
        const validationErrors = error as IValidationErrors;
        return {
          values: {} as FormValues,
          errors: validationErrors.inner.reduce(
            (
              acc: Record<keyof FormValues, string>,
              error: IValidationError
            ) => {
              acc[error.path as keyof FormValues] = error.message;
              return acc;
            },
            {} as Record<keyof FormValues, string>
          ),
        };
      }
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await schema.validate(data, { abortEarly: false });
      dispatch(setFormData(data));
      dispatch(setFormImage({ image: formImage }));
      navigate('/');
    } catch (validationErrors: IValidationErrors | unknown) {
      if (validationErrors) {
        console.error('Validation errors:', validationErrors);
        const errors = (validationErrors as IValidationErrors)?.inner;
        if (errors) {
          errors.forEach((error: IValidationError) => {
            console.error(`${error.path}: ${error.message}`);
          });
        }
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Registration</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formItemWrapper}>
          <div className={styles.formItem}>
            {' '}
            <label htmlFor="name">Name:</label>
            <input type="text" {...register('name')} />
          </div>
          {errors.name && (
            <span className={styles.error}>
              {errors.name as React.ReactNode}
            </span>
          )}
        </div>

        <div className={styles.formItemWrapper}>
          <div className={styles.formItem}>
            {' '}
            <label htmlFor="age">Age:</label>
            <input type="number" {...register('age')} />
          </div>
          {errors.age && (
            <span className={styles.error}>
              {errors.age as React.ReactNode}
            </span>
          )}
        </div>

        <div className={styles.formItemWrapper}>
          <div className={styles.formItem}>
            <label htmlFor="email">Email:</label>
            <input type="text" {...register('email')} />
          </div>
          {errors.email && (
            <span className={styles.error}>
              {errors.email as React.ReactNode}
            </span>
          )}
        </div>

        <div className={styles.formItemWrapper}>
          <div className={styles.formItem}>
            <label htmlFor="password">Password:</label>
            <input type="password" {...register('password')} />
          </div>
          {errors.password && (
            <span className={styles.error}>
              {errors.password as React.ReactNode}
            </span>
          )}
        </div>

        <div className={styles.formItemWrapper}>
          <div className={styles.formItem}>
            <label htmlFor="passwordConfirm">Confirm Password:</label>
            <input type="password" {...register('passwordConfirm')} />
          </div>
          {errors.passwordConfirm && (
            <span className={styles.error}>
              {errors.passwordConfirm as React.ReactNode}
            </span>
          )}
        </div>

        <div className={styles.formItemWrapper}>
          <label>Gender:</label>
          <div className={styles.genderList}>
            <label className={styles.genderItem}>
              <input type="radio" {...register('gender')} value="male" />
              Male
            </label>
            <label className={styles.genderItem}>
              <input type="radio" {...register('gender')} value="female" />
              Female
            </label>
            <label className={styles.genderItem}>
              <input type="radio" {...register('gender')} value="other" />
              Other
            </label>
          </div>
          {errors.gender && (
            <span className={styles.error}>
              {errors.gender as React.ReactNode}
            </span>
          )}
        </div>

        <div className={styles.formItemWrapper}>
          <div className={styles.formItem}>
            <label htmlFor="acceptTerms">
              <input type="checkbox" {...register('acceptTerms')} />
              Accept Terms & Conditions
            </label>
          </div>
          {errors.acceptTerms && (
            <span className={styles.error}>
              {errors.acceptTerms as React.ReactNode}
            </span>
          )}
        </div>

        <div className={styles.formItemWrapper}>
          <div className={styles.formItem}>
            <label htmlFor="country">Select Country:</label>
            <input
              type="text"
              id="country"
              list="countriesList"
              {...register('country')}
            />
            <datalist id="countriesList">
              {countries.map((country) => (
                <option key={country.code} value={country.name} />
              ))}
            </datalist>
          </div>
          {errors.country && (
            <span className={styles.error}>
              {errors.country as React.ReactNode}
            </span>
          )}
        </div>

        <button
          className={styles.button}
          type="submit"
          disabled={
            !!errors.name ||
            !!errors.age ||
            !!errors.email ||
            !!errors.password ||
            !!errors.passwordConfirm ||
            !!errors.gender ||
            !!errors.country
          }
        >
          Submit
        </button>
      </form>
    </div>
  );
};
