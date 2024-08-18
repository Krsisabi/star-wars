import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import './index.scss';
import Layout from './components/Layout/Layout.tsx';
import { Home } from './components/Home/Home.tsx';
import { Error } from './components/Error/Error.tsx';
import { ControlledForm } from './components/ControlledForm/ControlledForm.tsx';
import { UncontrolledForm } from './components/UncontrolledForm/UncontrolledForm.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
        errorElement: <Error />,
      },
      {
        path: '/react-hook-form',
        element: <ControlledForm />,
        errorElement: <Error />,
      },
      {
        path: '/uncontrolled-form',
        element: <UncontrolledForm />,
        errorElement: <Error />,
      },
    ],
  },
  {
    path: '*',
    element: <Error />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
