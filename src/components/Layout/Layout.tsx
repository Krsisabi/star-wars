import type { ReactElement } from 'react';
import React from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '../Header';

const Layout: React.FC = (): ReactElement => (
  <>
    <Header />
    <main>
      <Outlet />
    </main>
  </>
);

export default Layout;
