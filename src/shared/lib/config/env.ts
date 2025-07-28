export const getEnvVariable = (key: string, defaultValue?: string): string => {
  const value = import.meta.env[key]
  if (!value && defaultValue === undefined) {
    throw new Error(`Env variable ${key} is not defined`)
  }
  return String(value || defaultValue)
}

export const appEnv = {
  MODE: getEnvVariable('VITE_NODE_ENV', 'development'),
  BASE_URL: getEnvVariable('VITE_BASE_URL', '/'),
  PORT: getEnvVariable('VITE_PORT', '5173'),
  HOST: getEnvVariable('VITE_HOST', 'localhost'),
  PREVIEW_PORT: getEnvVariable('VITE_PREVIEW_PORT', '4173'),
}
