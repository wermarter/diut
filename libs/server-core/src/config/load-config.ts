import { registerAs } from '@nestjs/config'
import { ClassConstructor, plainToInstance } from 'class-transformer'
import { validateSync } from 'class-validator'

/**
 * Please add this line to the top where this function is used
 *
 * `import { registerAs } from '@nestjs/config'`
 */
export function makeConfigLoader(ConfigClass: ClassConstructor<unknown>) {
  return registerAs(ConfigClass.name, () => {
    const config = plainToInstance(ConfigClass, process.env, {
      enableImplicitConversion: true,
      excludeExtraneousValues: false,
    })

    const errors = validateSync(config as object, {
      skipMissingProperties: false,
    })

    if (errors.length > 0) {
      throw new Error(errors.toString())
    }

    return config
  })
}
