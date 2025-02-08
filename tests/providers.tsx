import { PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';

export const AllTheProviders = ({ children }: PropsWithChildren) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

AllTheProviders.displayName = 'AllTheProviders';
