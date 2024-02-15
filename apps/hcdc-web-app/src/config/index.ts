export * from './env'

export const appConfig = {
  isProduction: import.meta.env.PROD,
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
}
