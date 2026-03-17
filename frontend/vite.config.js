import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "/app/dist"
  },
  define: {
    'process.env.VITE_PASS_URL': JSON.stringify(process.env.VITE_PASS_URL)
  }
})
