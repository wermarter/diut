import { BadRequestException } from '@nestjs/common'
import { ClassConstructor, plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'

export const validateDto = async <T extends object>(
  plainObject: object,
  dtoClass: ClassConstructor<T>,
) => {
  const instance = plainToInstance(dtoClass, plainObject)

  const errors = await validate(instance)
  if (errors.length > 0) {
    throw new BadRequestException({
      errors: errors.map(({ constraints }) => {
        return Object.values(constraints)[0]
      }),
    })
  }

  return instance
}
