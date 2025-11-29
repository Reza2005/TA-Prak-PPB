// vite.config.js
import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // *** PERBAIKAN: TAMBAHKAN BASE PATH RELATIF ***
  base: './', 
  // *****************************************
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate',
    devOptions: {
      enabled: true
    },
    includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
    manifest: {
      name: 'Meme Archive',
      short_name: 'MemeArchive',
      description: 'Aplikasi sederhana untuk mengarsipkan meme favorit.',
      theme_color: '#ffffff',
      icons: [
        // ... (sisanya sama)
      ]
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
      cleanupOutdatedCaches: true,
      clientsClaim: true,
    }
  }),
  ],
})