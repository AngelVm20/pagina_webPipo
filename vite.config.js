import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      // ajustes recomendados
      png: { quality: 75 },
      jpeg: { quality: 75 },
      webp: { quality: 75 },
      avif: { quality: 60 },
      // puedes ajustar según pruebas
    }),
  ],
  base: '/pagina_webPipo/',
})
