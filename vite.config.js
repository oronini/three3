import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/three3/',
  build: {
    outDir: 'docs',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'), // ← メインの HTML ファイル
      },
    },
  },
});
