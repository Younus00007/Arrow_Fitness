import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080, // Ensuring it matches your tunnel port
    allowedHosts: true // This tells Vite to stop blocking tunnel URLs
  }
})
