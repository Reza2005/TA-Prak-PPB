// vite.config.js
import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './', 
  plugins: [
    react(), 
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      // 1. Point to the new simple filename
      includeAssets: ['favicon.svg', 'apple-touch-icon.png', 'logo.png'],
      manifest: {
        name: 'Meme Archive',
        short_name: 'MemeArchive',
        description: 'Aplikasi sederhana untuk mengarsipkan meme favorit.',
        theme_color: '#ffffff',
        // 2. Update icons to use logo.png
        icons: [
          {
            src: 'logo.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: 'logo.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
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