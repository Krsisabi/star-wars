import { Route, Routes } from 'react-router-dom';

import { Details } from '~/components/Details';
import { Home } from '~/pages/Home';
import { NotFound } from '~/pages/NotFound';
import { ROUTES } from '~/routes';

export function App() {
  return (
    <Routes>
      <Route path={ROUTES.home} element={<Home />}>
        <Route path={ROUTES.details} element={<Details />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
