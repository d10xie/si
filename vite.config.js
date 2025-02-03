import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist'  // Vercel wymaga katalogu `dist`
  },
  server: {
    host: true
  }
})
