import { BadRequestException } from '@nestjs/common'
import { ClassConstructor, plainToInstance } from 'class-transformer'
import { validate, validateSync } from 'class-validator'

export const validateDto = async <T extends object>(
  plainObject: object,
  dtoClass: ClassConstructor<T>,
  errorFactory: (detail: string) => unknown = (detail) =>
    new BadRequestException(detail),
) => {
  const instance = plainToInstance(dtoClass, plainObject, {
    excludeExtraneousValues: true,
  })

  const errors = await validate(instance, {})
  if (errors.length > 0) {
    throw errorFactory(errors.join('\n'))
  }

  return instance
}

export const validateDtoSync = <T extends object>(
  plainObject: object,
  dtoClass: ClassConstructor<T>,
  errorFactory: (detail: string) => unknown = (detail) =>
    new BadRequestException(detail),
) => {
  const instance = plainToInstance(dtoClass, plainObject, {
    excludeExtraneousValues: true,
  })

  const errors = validateSync(instance, {})

  if (errors.length > 0) {
    throw errorFactory(errors.join('\n'))
  }

  return instance
}
