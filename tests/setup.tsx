import '@testing-library/jest-dom/vitest';

import {
  act,
  fireEvent,
  render,
  type RenderOptions,
  screen,
  waitFor,
} from '@testing-library/react';

import { AllTheProviders } from './providers';

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export { act, fireEvent, customRender as render, screen, waitFor };
