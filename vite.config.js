import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate", // Ensures the service worker updates automatically
      devOptions: {
        enabled: true, // Enables PWA in development for testing
      },
      manifest: {
        name: "Aloom Front",
        short_name: "Aloom",
        description: "A Progressive Web App built with Vite and React",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        icons: [
          {
            src: "/pwa-icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "images-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
              },
            },
          },
          {
            urlPattern: ({ request }) => request.destination === "script",
            handler: "NetworkFirst",
            options: {
              cacheName: "scripts-cache",
              expiration: {
                maxEntries: 30,
              },
            },
          },
        ],
      },
    }),
  ],
  server: {
    host: true,
    strictPort: true,
    port: 8080,
  },
});
