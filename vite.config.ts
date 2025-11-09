import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    // Enable code splitting with manual chunks for better caching
    rollupOptions: {
      output: {
        manualChunks: (id: string) => {
          // Vendor chunks - change less frequently, better caching
          if (id.includes("node_modules")) {
            if (
              id.includes("react") ||
              id.includes("react-dom") ||
              id.includes("react-router")
            ) {
              return "react-vendor";
            }
            if (id.includes("@mui") || id.includes("@emotion")) {
              return "mui-vendor";
            }
            if (id.includes("i18next")) {
              return "i18n-vendor";
            }
            return "vendor"; // All other dependencies
          }
        },
      },
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Enable sourcemaps for debugging (can disable in production)
    sourcemap: false,
    // Optimize CSS
    cssMinify: true,
  },

  // Development server configuration
  server: {
    port: 5174,
    cors: true,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },

  // Preview server configuration
  preview: {
    port: 4173,
    cors: true,
  },
});
