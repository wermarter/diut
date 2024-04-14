// Required environment variables
const ENV_VARS = ['VITE_API_BASE_URL']

export function checkEnvVariables() {
  ENV_VARS.forEach((key) => {
    if (!import.meta.env[key]) {
      console.warn(`WARNING: Missing the environment variable "${key}"`)
    }
  })
}
