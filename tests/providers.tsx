import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '~/store';

export const AllTheProviders = ({ children }: PropsWithChildren) => {
  return (
    <BrowserRouter>
      <Provider store={store}>{children}</Provider>
    </BrowserRouter>
  );
};

AllTheProviders.displayName = 'AllTheProviders';
