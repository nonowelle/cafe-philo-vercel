import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Use a factory so we can conditionally import plugins safely
export default defineConfig(async () => {
  const plugins = [vue()]

  // Only include devtools in dev mode
  if (process.env.NODE_ENV === 'development') {
    const { default: vueDevTools } = await import('vite-plugin-vue-devtools')
    plugins.push(vueDevTools())
  }

  return {
    plugins,
    build: {
      outDir: 'dist',      // dossier final pour Vercel
      emptyOutDir: true
    },
    server: {
      proxy: {
        '/api/form': 'http://localhost:3000'
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
  }
})