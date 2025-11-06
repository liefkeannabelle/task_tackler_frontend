// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [vue()],
//     server: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:9000',
//         changeOrigin: true,
//         secure: false,
//       },
//       '/events': {
//         target: 'http://localhost:9000',
//         changeOrigin: true,
//         secure: false,
//       },
//     },
//   },
// })

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
      '/events': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
