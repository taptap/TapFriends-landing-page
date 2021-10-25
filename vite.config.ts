import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import reactJsx from 'vite-react-jsx';
import WindiCSS from 'vite-plugin-windicss';
import legacy from '@vitejs/plugin-legacy';
import path from 'path';
import replace from './plugins/replace';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), reactJsx(), WindiCSS(), legacy(), replace],
  resolve: {
    alias: {
      assets: path.resolve('./src/assets'),
      components: path.resolve('./src/components'),
      utils: path.resolve('./src/utils'),
      '@': path.resolve('./src'),
    },
  },
});
