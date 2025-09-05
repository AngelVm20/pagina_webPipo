import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      webp: { quality: 72 }, // valor seguro
      png:  { quality: 75  },
      jpeg: { quality: 75  },
    }),
  ],
  base: '/',
})