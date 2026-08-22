import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/M-Project/',
  server: {
    host: '0.0.0.0',
    allowedHosts: true
  }
});
