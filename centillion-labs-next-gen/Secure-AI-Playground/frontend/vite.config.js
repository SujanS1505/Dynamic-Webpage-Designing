import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/playground/',
  server: {
    port: 5174,
    // Allow the Centillion site (localhost:5173) to embed this in an iframe
    headers: {
      'Content-Security-Policy': "frame-ancestors *",
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8096',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
