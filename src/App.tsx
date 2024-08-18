import { Route, Routes } from 'react-router-dom';
import { Home } from './components/Home';
import { UncontrolledForm } from './components/UncontrolledForm';
import { ControlledForm } from './components/ControlledForm';
import { Error } from './components/Error';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/react-hook-form" element={<ControlledForm />} />
      <Route path="/uncontrolled-form" element={<UncontrolledForm />} />
      <Route path="/*" element={<Error />} />
    </Routes>
  );
};

export default App;
