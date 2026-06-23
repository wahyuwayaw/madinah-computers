import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/madinah/',
  server: {
    allowedHosts: true,
    proxy: {
      '/api': 'http://localhost:3002'
    }
  }
})
