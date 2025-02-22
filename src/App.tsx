import { Route, Routes } from 'react-router-dom';
import { Details } from './components';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="details/:id" element={<Details />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
