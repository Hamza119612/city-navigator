import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, 
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
    coverage: {
      provider: 'istanbul', 
      reporter: ['text', 'html'],
      reportsDirectory: './coverage',
      exclude: ['node_modules/', 'src/config/'],
    },
  },
});
