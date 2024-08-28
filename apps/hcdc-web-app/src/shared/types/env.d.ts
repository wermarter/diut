/// <reference types="vite/client" />

interface importMeta {
  readonly env: importMetaEnv
}

interface importMetaEnv {
  readonly VITE_API_BASE_URL: string
}
