import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: { fatalDeprecations: ['mixed-decls'] },
    },
  },
  resolve: {
    alias: {
      '~': '/src',
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/test/setup.ts',
  },
});
