import { defineConfig, mergeConfig, configDefaults } from 'vitest/config'
import type { ConfigEnv } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import viteConfig from './vite.config.js'

export default defineConfig(({ mode }) => {
  const fullEnv: ConfigEnv = {
    mode,
    command: 'serve',
  }

  const baseConfig = typeof viteConfig === 'function'
    ? viteConfig(fullEnv)
    : viteConfig

  return mergeConfig(baseConfig, {
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      globals: true,
    },
  })
})
