import { registerAs } from '@nestjs/config'
import { ClassConstructor, plainToInstance } from 'class-transformer'
import { validateSync } from 'class-validator'

import { ConfigurationException } from './config.exception'

/**
 * Please add this line to the top where this function is used
 *
 * `import { registerAs } from '@nestjs/config'`
 *  and manually type: ReturnType<typeof registerAs>
 *
 *  or just add to package.json
 *  "dependenciesMeta": {
 *   "@diut/nestjs-infra": {
 *     "injected": true
 *   }
 *  },
 */
export function makeConfigLoader(ConfigClass: ClassConstructor<any>) {
  return registerAs(ConfigClass.name, () => {
    return loadConfigFromEnv(ConfigClass)
  })
}

export function loadConfigFromEnv<T extends object = object>(
  ConfigClass: ClassConstructor<T>,
) {
  const config = plainToInstance(ConfigClass, process.env, {
    enableImplicitConversion: true,
    excludeExtraneousValues: true,
    exposeDefaultValues: true,
  })

  const errors = validateSync(config as object, {
    skipMissingProperties: false,
  })

  if (errors.length > 0) {
    throw new ConfigurationException(errors.toString())
  }

  return config
}
