import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),  // ✅ easy @ path
    },
  },
  build: {
    // 🚀 Bump the threshold so >500kb bundles don't nag you
    chunkSizeWarningLimit: 1000,

    // Optional: split out vendor libs into their own chunk
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
})