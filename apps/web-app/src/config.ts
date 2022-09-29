// Required environment variables
const ENV_VARS = ['VITE_API_BASE_URL']

export const appConfig = {
  isProduction: import.meta.env.PROD,
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,

  checkEnvVariables: function () {
    ENV_VARS.forEach((key) => {
      if (!import.meta.env[key]) {
        console.warn(`WARNING: Missing the environment variable "${key}"`)
      }
    })
  },
}
