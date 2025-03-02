import '@testing-library/jest-dom/vitest';

import type { RenderOptions } from '@testing-library/react';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';

import type { AppStore } from '~/store/store';
import { makeStore } from '~/store/store';

import { Providers } from './providers';

type Options = Omit<RenderOptions, 'wrapper'> & {
  store?: AppStore;
};

const customRender = (
  ui: ReactElement,
  { store = makeStore(), ...options }: Options = {}
) => {
  function Wrapper({ children }: { children: ReactNode }) {
    return <Providers store={store}>{children}</Providers>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...options }) };
};

export { act, fireEvent, customRender as render, screen, waitFor };
