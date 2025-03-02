import type { RenderOptions } from '@testing-library/react';
import {
  render as renderWithoutProviders,
  screen,
} from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import type { AppStore } from '~/store/store';
import { makeStore } from '~/store/store';

import { BackButton, LocationProbe } from './router';

type Options = Omit<RenderOptions, 'wrapper'> & {
  store?: AppStore;
  // The addresses visited so far, the current one last. With them come a
  // probe that shows the address and a Back button.
  history?: string[];
};

// Renders inside a router and a store of its own, the store filled
// beforehand where the test passes one.
export function render(
  ui: ReactElement,
  { store = makeStore(), history, ...options }: Options = {}
) {
  const entries = history ?? ['/'];

  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <MemoryRouter initialEntries={entries} initialIndex={entries.length - 1}>
        <Provider store={store}>{children}</Provider>
        {history && (
          <>
            <LocationProbe />
            <BackButton />
          </>
        )}
      </MemoryRouter>
    );
  }

  return {
    store,
    ...renderWithoutProviders(ui, { wrapper: Wrapper, ...options }),
  };
}

export const currentLocation = () => screen.getByTestId('location');

export { fireEvent, screen } from '@testing-library/react';
