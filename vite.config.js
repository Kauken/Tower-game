import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Nome esatto del repository: serve a GitHub Pages per trovare i file.
// Se questo valore è sbagliato, la pagina pubblicata resta bianca.
export default defineConfig({
  base: '/Tower-game/',
  plugins: [react()]
})
