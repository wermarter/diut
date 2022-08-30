import { ClassConstructor, plainToInstance } from 'class-transformer'
import { validateSync } from 'class-validator'

export function validateConfig(configClass: ClassConstructor<object>) {
  return function (config: Record<string, unknown>) {
    const validatedConfig = plainToInstance(configClass, config, {
      enableImplicitConversion: true,
    })
    const errors = validateSync(validatedConfig, {
      skipMissingProperties: false, // ? how does this works with @Required()
    })

    if (errors.length > 0) {
      throw new Error(errors.toString())
    }
    return validatedConfig
  }
}
