import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~': '/src',
      '@/tests': '/tests',
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'tests/setup.tsx',
  },
});
