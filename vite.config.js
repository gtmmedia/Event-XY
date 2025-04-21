import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: 'React-X',
  plugins: [react()],
  css: {
    postcss: './postcss.config.js'
  }
})
