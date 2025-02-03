import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist' // Upewnij się, że folder outputu to `dist`
  },
  server: {
    port: 3000, // Możesz zmienić, jeśli port jest zajęty
    host: true
  }
})
