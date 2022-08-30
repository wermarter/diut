import { flattenKeys } from '@diut/common'
import { readFileSync } from 'fs'
import { get, set, snakeCase } from 'lodash'

export const JSON_CONFIG_FILENAME = 'config.json'
export const PACKAGE_CONFIG_FILENAME = 'package.json'

export const loadConfig = () => {
  let configObj: object
  try {
    configObj = JSON.parse(readFileSync(JSON_CONFIG_FILENAME, 'utf-8'))
  } catch (e) {
    console.error(e)
    configObj = {}
  }

  const paths = flattenKeys(configObj, null)

  for (const path of paths) {
    const envKey = snakeCase(path).toUpperCase()

    // Prioritize ENV vars over config.json
    set(configObj, path, process.env[envKey] ?? get(configObj, path))
  }

  const packageConfigObj = JSON.parse(
    readFileSync(PACKAGE_CONFIG_FILENAME, 'utf-8')
  )

  return {
    ...configObj,
    env: process.env['NODE_ENV'] || 'development',
    package: packageConfigObj,
  }
}
