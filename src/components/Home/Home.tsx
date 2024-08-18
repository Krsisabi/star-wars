import styles from './Home.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '~/store';
import FormItem from '../FormItem/FormItem';

export const Home = () => {
  const forms = useSelector((state: RootState) => state.form.forms);
  return (
    <section className={styles.wrapper}>
      {forms.length ? (
        <ul className={styles.list}>
          {forms.map((form) => (
            <FormItem form={form} key={form.id} />
          ))}
        </ul>
      ) : (
        <p className={styles.title}>No Forms</p>
      )}
    </section>
  );
};
