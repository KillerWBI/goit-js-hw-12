import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  base: '/goit-js-hw-12/', // обязательно с именем репозитория
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
