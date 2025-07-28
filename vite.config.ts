import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import tailwindcss from '@tailwindcss/vite'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  process.env = { ...process.env, ...env }

  const isDev = mode === 'development'
  const host = env.VITE_HOST || 'localhost'
  const port = Number(env.VITE_PORT) || 5173
  const previewPort = Number(env.VITE_PREVIEW_PORT) || 4173
  const appEnv = mode

  const plugins = [vue(), vueJsx(), tailwindcss(), isDev && vueDevTools()].filter(Boolean)

  return {
    mode: appEnv,
    plugins,
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },

    server: {
      host,
      port,
      open: false,
    },

    preview: {
      port: previewPort,
    },

    define: {
      __APP_ENV__: JSON.stringify(appEnv),
    },
  }
})
