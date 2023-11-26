import { Route, Routes } from 'react-router';
import { ItemList } from './pages/ItemList';
import { Details } from './components/Details';
import { DETAILS_ROUTE, LIST_ROUTE } from './constants';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';

const App = () => {
  return (
    <Routes>
      <Route path={LIST_ROUTE} element={<ItemList />}>
        <Route path={DETAILS_ROUTE} element={<Details />} />
      </Route>
      <Route index element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
