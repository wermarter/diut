import { readFileSync } from 'fs'
import { get, set, snakeCase } from 'lodash'
import { load } from 'js-yaml'
import { flattenKeys, NodeEnv } from '@diut/common'
import { join } from 'path'

export const APP_CONFIG_FILENAME = '../../config.yml'
export const PACKAGE_CONFIG_FILENAME = 'package.json'

interface AppConfig {
  package: Record<string, unknown>
  env: NodeEnv
}

export const loadConfig = async (): Promise<AppConfig> => {
  const configObj = load(
    readFileSync(join(__dirname, APP_CONFIG_FILENAME), 'utf-8')
  ) as Record<string, unknown>

  const paths = flattenKeys(configObj, null)

  for (const path of paths) {
    const envKey = snakeCase(path).toUpperCase()

    // Prioritize ENV vars over config.yml
    set(configObj, path, process.env[envKey] ?? get(configObj, path))
  }

  const packageConfigObj = JSON.parse(
    readFileSync(PACKAGE_CONFIG_FILENAME, 'utf-8')
  )

  return {
    ...configObj,
    env: (process.env['NODE_ENV'] as NodeEnv) || NodeEnv.Development,
    package: packageConfigObj,
  }
}
