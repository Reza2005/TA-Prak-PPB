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
      // Ensure 'logo.png' exists in your public folder
      includeAssets: ['favicon.svg', 'apple-touch-icon.png', 'logo.png'],
      manifest: {
        name: 'Meme Archive',
        short_name: 'MemeArchive',
        description: 'Aplikasi sederhana untuk mengarsipkan meme favorit.',
        theme_color: '#ffffff',
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