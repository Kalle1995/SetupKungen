import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  server: {
    port: 3000, 
    strictPort: true, // Tvingar Vite att använda 3000
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Din backend-port
        changeOrigin: true,
        secure: false,
      }
    }
  }
})