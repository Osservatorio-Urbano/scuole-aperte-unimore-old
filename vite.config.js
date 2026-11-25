import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Necessario per percorsi relativi su GitHub Pages o sottocartelle
  server: {
    watch: {
      ignored: ['**/public/**']
    }
  }
})
