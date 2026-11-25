import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/scuole-aperte-unimore/', // Corretto per https://osservatorio-urbano.github.io/scuole-aperte-unimore/
  server: {
    watch: {
      ignored: ['**/public/**']
    }
  }
})
