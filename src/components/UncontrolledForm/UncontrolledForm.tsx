import React, { useState, FormEvent, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './UncontrolledForm.module.scss';
import { schema } from '~/utils/schema';
import { selectCountries, addFormData } from '~/store/formReducer';
import convertToBase64 from '~/utils/convertToBase64';

interface FormErrors {
  name?: string;
  age?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
  gender?: string;
  country?: string;
  agreement?: string;
  image?: string;
}

interface ValidationError {
  path?: keyof FormErrors;
  message: string;
}

interface ValidationErrors {
  inner: ValidationError[];
}

export const UncontrolledForm = () => {
  const dispatch = useDispatch();
  const countries = useSelector(selectCountries);
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);

  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const file = formData.get('image') as File;

    const ageValue = formData.get('age');
    const formValues = {
      name: (formData.get('name') as string) || '',
      age: ageValue !== null ? +ageValue : -1,
      email: (formData.get('email') as string) || '',
      password: (formData.get('password') as string) || '',
      passwordConfirm: (formData.get('passwordConfirm') as string) || '',
      gender: (formData.get('gender') as string) || '',
      agreement: formData.get('agreement') === 'on' || false,
      country: (formData.get('country') as string) || '',
      image: [file],
    };

    try {
      await schema.validate(formValues, { abortEarly: false });
      const base64 = await convertToBase64(file);
      const form = {
        id: crypto.randomUUID(),
        type: 'Uncontrolled form',
        ...formValues,
        image: base64,
      };

      dispatch(addFormData(form));
      setErrors({});
      navigate('/');
    } catch (error) {
      const validationErrors = error as ValidationErrors;
      if (validationErrors.inner && validationErrors.inner.length > 0) {
        const newErrors: FormErrors = {};
        (
          validationErrors.inner as Array<{
            path?: keyof FormErrors;
            message: string;
          }>
        ).forEach((error) => {
          if (error.path) {
            newErrors[error.path as keyof FormErrors] = error.message;
          }
        });
        setErrors(newErrors as FormErrors);
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Uncontrolled form</h1>
      <form onSubmit={handleSubmit} className={styles.form} ref={formRef}>
        <div className={styles.formItemWrapper}>
          <div className={styles.formItem}>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" id="name" />
          </div>

          {errors.name && <span className={styles.error}>{errors.name}</span>}
        </div>

        <div className={styles.formItemWrapper}>
          <div className={styles.formItem}>
            <label htmlFor="age">Age:</label>
            <input type="number" name="age" id="age" />
          </div>

          {errors.age && <span className={styles.error}>{errors.age}</span>}
        </div>

        <div className={styles.formItemWrapper}>
          <div className={styles.formItem}>
            <label htmlFor="email">Email:</label>
            <input type="text" name="email" id="email" />
          </div>

          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </div>

        <div className={styles.formItemWrapper}>
          <div className={styles.formItem}>
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password" />
          </div>

          {errors.password && (
            <div className={styles.error}>{errors.password}</div>
          )}
        </div>

        <div className={styles.formItemWrapper}>
          <div className={styles.formItem}>
            <label htmlFor="passwordConfirm">Confirm Password:</label>
            <input
              type="password"
              name="passwordConfirm"
              id="passwordConfirm"
            />
          </div>

          {errors.passwordConfirm && (
            <span className={styles.error}>{errors.passwordConfirm}</span>
          )}
        </div>

        <div className={styles.formItemWrapper}>
          <label>Gender:</label>
          <div className={styles.genderList}>
            <label className={styles.genderItem}>
              <input type="radio" name="gender" />
              &nbsp;Male
            </label>
            <label className={styles.genderItem}>
              <input type="radio" name="gender" />
              &nbsp;Female
            </label>
            <label className={styles.genderItem}>
              <input type="radio" name="gender" />
              &nbsp;Other
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
            <label htmlFor="country">Select Country:</label>
            <input
              type="text"
              id="country"
              name="country"
              list="countriesList"
            />
          </div>

          <datalist id="countriesList">
            {countries.map((country) => (
              <option key={country.code} value={country.name} />
            ))}
          </datalist>
          {errors.country && (
            <span className={styles.error}>{errors.country}</span>
          )}
        </div>

        <div className={styles.formItemWrapper}>
          <div className={styles.formItem}>
            <label className={styles.text_label} htmlFor="image">
              Upload picture
            </label>
            <input
              className={styles.input}
              type="file"
              name="image"
              id="image"
            />
          </div>
          {errors.image && <p className={styles.error}>{errors.image}</p>}
        </div>

        <div className={styles.formItemWrapper}>
          <div className={styles.formItem}>
            <label className={styles.text_label} htmlFor="agreement">
              Accept Terms & Conditions
            </label>
            <input
              className={styles.input}
              type="checkbox"
              name="agreement"
              id="agreement"
            />
          </div>
          {errors.agreement && (
            <p className={styles.error}>{errors.agreement}</p>
          )}
        </div>

        <button className={styles.button} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
