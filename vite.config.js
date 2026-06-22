import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    allowedHosts: true,
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
})
