import { Outlet } from 'react-router';
import { List } from '~/components/List';
import { Search } from '~/components/Search';
import { Pagination } from '~/components/Pagination';
import { ErrorButton } from '~/components/ErrorButton';
import { useSearchContext, useFetchList } from '~/hooks';
import styles from './Home.module.scss';

export const Home = () => {
  const { searchValue, currentPage, isLoading, fetchList } = useSearchContext();

  const { results } = useFetchList({ searchValue, pageNumber: currentPage });

  return (
    <div className={styles.home}>
      <ErrorButton />
      <Search onSubmit={fetchList} />
      {isLoading ? (
        <h2 style={{ marginTop: '32px' }}>Loading...</h2>
      ) : (
        <>
          <div className={styles.wrapper}>
            <List />
            <Outlet />
          </div>
          {results && <Pagination />}
        </>
      )}
    </div>
  );
};
