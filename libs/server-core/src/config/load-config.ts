import { registerAs } from '@nestjs/config'
import { ClassConstructor, plainToInstance } from 'class-transformer'
import { validateSync } from 'class-validator'

import { ConfigurationException } from './config.exception'

/**
 * Please add this line to the top where this function is used
 *
 * `import { registerAs } from '@nestjs/config'`
 */
export function makeConfigLoader(ConfigClass: ClassConstructor<unknown>) {
  return registerAs(ConfigClass.name, () => {
    return loadConfigFromEnv(ConfigClass)
  })
}

export function loadConfigFromEnv<T = unknown>(
  ConfigClass: ClassConstructor<T>,
) {
  const config = plainToInstance(ConfigClass, process.env, {
    enableImplicitConversion: true,
    excludeExtraneousValues: false,
  })

  // console.log({ class: ConfigClass.name, process_env: process.env, config })

  const errors = validateSync(config as object, {
    skipMissingProperties: false,
  })

  if (errors.length > 0) {
    throw new ConfigurationException(errors.toString())
  }

  return config
}
