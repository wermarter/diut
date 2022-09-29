import { ClassConstructor, plainToInstance } from 'class-transformer'
import { validateSync } from 'class-validator'

import { ConfigurationException } from './config.exception'

export function validateConfig<T>(configClass: ClassConstructor<T>) {
  return function (config: Record<string, unknown>) {
    const validatedConfig = plainToInstance(configClass, config ?? {}, {
      enableImplicitConversion: true,
    }) as unknown

    const errors = validateSync(validatedConfig as object, {
      skipMissingProperties: false, // ? how does this works with @Required()
    })

    if (errors.length > 0) {
      throw new ConfigurationException(errors.toString())
    }

    return validatedConfig as T
  }
}
