import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://document-upload-a9fg.onrender.com/',
        changeOrigin: true,
      },
    },
  },
})
