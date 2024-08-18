import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addFormData, selectCountries } from '~/store/formReducer';
import { FormValues } from '~/store/formReducer';
import { schema } from '~/utils/schema';
import convertToBase64 from '~/utils/convertToBase64';
import styles from './ControlledForm.module.scss';

type FormData = {
  age: number;
  name: string;
  password: string;
  email: string;
  passwordConfirm: string;
  gender: string;
  agreement: boolean;
  country: string;
  image: FileList;
};

type ValidationError = {
  path?: keyof FormValues;
  message: string;
};

type ValidationErrors = {
  inner: ValidationError[];
};

export const ControlledForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const file = data.image[0];
      if (!file) return;
      const base64 = await convertToBase64(file);
      const form = {
        id: crypto.randomUUID(),
        type: 'Controlled form',
        ...data,
        image: base64,
      };
      dispatch(addFormData(form));
      navigate('/');
    } catch (validationErrors: ValidationErrors | unknown) {
      if (validationErrors) {
        const errors = (validationErrors as ValidationErrors)?.inner;
        if (errors) {
          errors.forEach((error: ValidationError) => {
            console.error(`${error.path}: ${error.message}`);
          });
        }
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>React hook form</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formItemWrapper}>
          <div className={styles.formItem}>
            {' '}
            <label htmlFor="name">Name:</label>
            <input type="text" {...register('name')} />
          </div>
          {errors.name && (
            <span className={styles.error}>{errors.name.message}</span>
          )}
        </div>

        <div className={styles.formItemWrapper}>
          <div className={styles.formItem}>
            {' '}
            <label htmlFor="age">Age:</label>
            <input type="number" {...register('age')} />
          </div>
          {errors.age && (
            <span className={styles.error}>{errors.age.message}</span>
          )}
        </div>

        <div className={styles.formItemWrapper}>
          <div className={styles.formItem}>
            <label htmlFor="email">Email:</label>
            <input type="text" {...register('email')} />
          </div>
          {errors.email && (
            <span className={styles.error}>{errors.email.message}</span>
          )}
        </div>

        <div className={styles.formItemWrapper}>
          <div className={styles.formItem}>
            <label htmlFor="password">Password:</label>
            <input type="password" {...register('password')} />
          </div>
          {errors.password && (
            <span className={styles.error}>{errors.password.message}</span>
          )}
        </div>

        <div className={styles.formItemWrapper}>
          <div className={styles.formItem}>
            <label htmlFor="passwordConfirm">Confirm Password:</label>
            <input type="password" {...register('passwordConfirm')} />
          </div>
          {errors.passwordConfirm && (
            <span className={styles.error}>
              {errors.passwordConfirm.message}
            </span>
          )}
        </div>

        <div className={styles.formItemWrapper}>
          <label>Gender:</label>
          <div className={styles.genderList}>
            <label className={styles.genderItem}>
              <input type="radio" {...register('gender')} value="male" />
              &nbsp;Male
            </label>
            <label className={styles.genderItem}>
              <input type="radio" {...register('gender')} value="female" />
              &nbsp;Female
            </label>
            <label className={styles.genderItem}>
              <input type="radio" {...register('gender')} value="other" />
              &nbsp;Other
            </label>
          </div>
          {errors.gender && (
            <span className={styles.error}>{errors.gender.message}</span>
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
            <span className={styles.error}>{errors.country.message}</span>
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
              id="image"
              {...register('image')}
            />
          </div>
          {errors.image && (
            <p className={styles.error}>{errors.image.message}</p>
          )}
        </div>

        <div className={styles.formItemWrapper}>
          <div className={styles.formItem}>
            <label className={styles.text_label} htmlFor="agreement">
              Accept Terms & Conditions
            </label>
            <input
              className={styles.input}
              type="checkbox"
              id="agreement"
              {...register('agreement')}
            />
          </div>
          {errors.agreement && (
            <p className={styles.error}>{errors.agreement.message}</p>
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
            !!errors.country ||
            !!errors.agreement
          }
        >
          Submit
        </button>
      </form>
    </div>
  );
};
