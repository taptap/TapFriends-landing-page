import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import reactJsx from 'vite-react-jsx';
import WindiCSS from 'vite-plugin-windicss';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), reactJsx(), WindiCSS()],
  resolve: {
    alias: {
      assets: path.resolve('./src/assets'),
      components: path.resolve('./src/components'),
    },
  },
});
