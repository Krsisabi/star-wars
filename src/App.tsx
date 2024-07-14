import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Details } from './components/Details';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/details/:id" element={<Details />} />
      </Route>
    </Routes>
  );
}

export default App;
