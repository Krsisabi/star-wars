import styles from './FormItem.module.scss';
import { FormValues } from '~/store/formReducer';

type FormThumbnailProps = {
  form: FormValues;
  isHighlighted: boolean;
};

const FormItem = ({ form, isHighlighted }: FormThumbnailProps) => (
  <li
    className={`${styles.formItem} ${isHighlighted ? styles.highlighted : ''}`}
  >
    <img className={styles.image} src={form.image} alt="image" />
    <div className={styles.text}>Type: {form.type}</div>
    <div className={styles.text}>Name: {form.name}</div>
    <div className={styles.text}>Email: {form.email}</div>
    <div className={styles.text}>Gender: {form.gender}</div>
    <div className={styles.text}>Age: {form.age}</div>
    <div className={styles.text}>Country: {form.country}</div>
    <div className={styles.text}>Password: {form.password}</div>
  </li>
);

export default FormItem;
