import { exampleMongoObjectId } from '@diut/common'
import { BaseEntity, EntityData } from '@diut/hcdc'
import { ApiPropertyOptions } from '@nestjs/swagger'

export const exampleBaseEntity = {
  _id: exampleMongoObjectId,
  createdAt: {
    format: 'date-time',
    example: '2022-08-20T16:00:00.000Z',
  },
  updatedAt: {
    format: 'date-time',
    example: '2022-08-20T16:00:00.000Z',
  },
  isDeleted: {
    type: 'boolean',
  },
  deletedAt: {
    required: false,
    format: 'date-time',
    example: '2022-08-20T16:00:00.000Z',
  },
} satisfies EntityExample<BaseEntity>

export type EntityExample<TEntity> = {
  [key in keyof Required<EntityData<TEntity>>]: Omit<
    ApiPropertyOptions,
    'example' | 'examples'
  > &
    (
      | {
          example?: EntityData<TEntity>[key]
        }
      | {
          examples?: EntityData<TEntity>[key][]
        }
    )
}

export type EntityDataExample<TEntity> = Omit<
  EntityExample<TEntity>,
  keyof BaseEntity
>
