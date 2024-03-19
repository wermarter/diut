import { ClassConstructor, plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'

import { EValidationRequestFailed } from 'src/domain'

export const validateDto = async <T extends object>(
  plainObject: object,
  dtoClass: ClassConstructor<T>,
) => {
  const instance = plainToInstance(dtoClass, plainObject)

  const errors = await validate(instance)
  if (errors.length > 0) {
    throw new EValidationRequestFailed(
      JSON.stringify(
        errors.map(({ constraints }) => {
          return Object.values(constraints ?? {})[0]
        }),
      ),
    )
  }

  return instance
}
