import { SchemaOptions } from '@nestjs/mongoose'
import { Expose } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'
import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import { ObjectId, Types } from 'mongoose'
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator'

export const exampleMongoObjectId = {
  example: '634180269de1f07e47bbf494',
  description: 'MongoDB ObjectId',
}

export const exampleDate = {
  format: 'date-time',
  example: '2018-03-20T09:12:28Z',
}

export class BaseResourceResponseDto {
  @ApiProperty(exampleMongoObjectId)
  _id: string

  @Expose()
  @ApiProperty(exampleDate)
  createdAt: Date

  @Expose()
  @ApiProperty(exampleDate)
  updatedAt: Date
}

export const baseSchemaOptions: SchemaOptions = {
  timestamps: true,
}

export class BaseSchema {
  _id: string

  createdAt: Date
  updatedAt: Date
}

@Injectable()
export class ObjectIdPipe implements PipeTransform<any, ObjectId> {
  transform(value: any): any {
    const validObjectId: boolean = Types.ObjectId.isValid(value)

    if (!validObjectId) {
      throw new BadRequestException(['invalid ObjectId in URL'])
    }

    return value
  }
}

export function IsObjectId(validationOptions?: ValidationOptions) {
  let message =
    validationOptions?.message ??
    ((args: ValidationArguments) => {
      return `${args.property} must be valid ObjectId string`
    })

  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isObjectId',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: { ...validationOptions, message },
      validator: {
        validate(value: any) {
          if (typeof value !== 'string') {
            return false
          }

          return Types.ObjectId.isValid(value)
        },
      },
    })
  }
}
