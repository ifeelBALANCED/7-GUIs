/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NODE_ENV: 'development' | 'production'
  readonly VITE_BASE_URL: string
  readonly VITE_PORT: string
  readonly VITE_HOST: string
  readonly VITE_PREVIEW_PORT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
