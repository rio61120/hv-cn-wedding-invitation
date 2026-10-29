import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const appUrl = (process.env.APP_URL ?? loadEnv(mode, process.cwd(), 'APP_URL').APP_URL)?.replace(/\/+$/, '') ?? '';

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'absolute-social-metadata-urls',
        transformIndexHtml(html) {
          return html.replaceAll('__APP_URL__', appUrl);
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
