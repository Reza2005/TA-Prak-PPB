// vite.config.js
import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // Base path relative for generic hosting
  base: './', 
  
  plugins: [
    react(), 
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      // 1. Add your new filename here so Vite processes it
      includeAssets: [ 'apple-touch-icon.png', 'Meme Archive Logo.png'],
      
      manifest: {
        name: 'Meme Archive',
        short_name: 'MemeArchive',
        description: 'Aplikasi sederhana untuk mengarsipkan meme favorit.',
        theme_color: '#ffffff',
        
        // 2. This is the section that was missing/empty in your file
        icons: [
          {
            src: 'Meme Archive Logo.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: 'Meme Archive Logo.png',
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