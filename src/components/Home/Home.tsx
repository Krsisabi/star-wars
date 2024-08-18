import styles from './Home.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '~/store';
import FormItem from '../FormItem/FormItem';
import { useEffect, useState } from 'react';

export const Home = () => {
  const forms = useSelector((state: RootState) => state.form.forms);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  useEffect(() => {
    if (forms.length) {
      const lastFormId = forms[forms.length - 1].id;
      setHighlightedId(lastFormId);

      const timer = setTimeout(() => {
        setHighlightedId(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [forms]);

  return (
    <section className={styles.wrapper}>
      {forms.length ? (
        <ul className={styles.list}>
          {forms.map((form) => (
            <FormItem
              form={form}
              key={form.id}
              isHighlighted={form.id === highlightedId}
            />
          ))}
        </ul>
      ) : (
        <p className={styles.title}>No Forms</p>
      )}
    </section>
  );
};
