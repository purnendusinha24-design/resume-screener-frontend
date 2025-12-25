import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/resume-screen-frontend/',
  plugins: [react()],
})
