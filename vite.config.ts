import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// The repo root `index.html` is a BUILD ARTIFACT committed for GitHub Pages
// (Pages serves this branch root directly). The real source entry is
// `index.src.html` so the deploy copy can never clobber it.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    rollupOptions: {
      input: fileURLToPath(new URL('./index.src.html', import.meta.url)),
    },
  },
})
