import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // server: {
  //   port: 8320,
  //   strictPort: true, 
  //   host: true,
  //   origin: 'https://0.0.0.0:8320',
  // }
})
