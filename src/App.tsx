import { Search } from './components/Search';
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.app}>
      <Search onChange={() => {}} onSubmit={() => {}} value="search form" />
    </div>
  );
}

export default App;
