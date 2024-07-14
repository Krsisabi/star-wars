import { Route, Routes } from 'react-router-dom';
import { Home, NotFound } from './pages';
import { Details } from './components';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/details/:id" element={<Details />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
