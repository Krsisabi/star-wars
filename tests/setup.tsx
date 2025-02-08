import '@testing-library/jest-dom/vitest';
import {
  render,
  type RenderOptions,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import { AllTheProviders } from './providers';

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export { customRender as render, screen, fireEvent, waitFor, act };
