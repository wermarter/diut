import { exampleMongoObjectId } from '@diut/common'
import {
  BadRequestException,
  Injectable,
  PipeTransform,
  applyDecorators,
} from '@nestjs/common'
import { Prop, SchemaOptions } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { Expose, Transform } from 'class-transformer'
import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator'
import { FilterQuery, ObjectId, PopulateOptions, Types } from 'mongoose'

// https://github.com/typestack/class-transformer/issues/494
export const ExposeObjectId = () =>
  applyDecorators(
    Expose(),
    Transform(
      ({ obj, key }) => {
        return obj[key]
      },
      { toClassOnly: true },
    ),
  )

export class BaseResourceResponseDto {
  @ExposeObjectId()
  @ApiProperty(exampleMongoObjectId)
  _id: string

  // @Expose()
  // @ApiProperty(exampleDate)
  // createdAt: Date

  // @Expose()
  // @ApiProperty(exampleDate)
  // updatedAt: Date
}

export const baseSchemaOptions: SchemaOptions = {
  timestamps: true,
  minimize: false,
  toObject: {
    getters: true,
    virtuals: true,
    minimize: false,
    versionKey: false,
    flattenMaps: true,
    flattenObjectIds: true,
  },
}

export class BaseSchema {
  _id: string

  createdAt: Date
  updatedAt: Date

  @Prop({ required: true, default: false, type: Boolean })
  isDeleted: boolean

  @Prop({ required: false, type: Date })
  deletedAt: Date
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

// Beware of nested populate path
export type PopulatePath<TEntity> =
  | keyof TEntity
  | `${string & keyof TEntity}.${string}`

export type PopulateConfig<TEntity> = {
  path: PopulatePath<TEntity>
  isDeleted?: boolean | null
  fields?: Array<string>
  match?: FilterQuery<unknown> | (() => FilterQuery<unknown>)
  populate?: PopulateOptions
}
