import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/*
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
*/

const vitePassUrl = JSON.stringify(process.env.VITE_PASS_URL);

let config = {
  plugins: [react()],
  build: { outDir: "/app/dist" },
  define: {
    'process.env.VITE_PASS_URL': vitePassUrl
  }
};

if (vitePassUrl) {
  config.server = {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: [new URL(vitePassUrl).hostname]
  };
}

export default defineConfig(config);