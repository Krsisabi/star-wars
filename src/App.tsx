import { Route, Routes } from 'react-router';
import { Home } from './pages/Home';
import { Details } from './components/Details';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="search/:id" element={<Details />} />
      </Route>
      <Route path="search" element={<Home />} />
    </Routes>
  );
};

export default App;
