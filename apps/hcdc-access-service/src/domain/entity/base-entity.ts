import { exampleMongoObjectId } from '@diut/nestjs-infra'
import { ApiPropertyOptions } from '@nestjs/swagger'
import { omit } from 'lodash'

export type BaseEntity = {
  _id: string

  createdAt: Date
  updatedAt: Date

  isDeleted: boolean
  deletedAt?: Date
}

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

export const baseEntityKeys: (keyof BaseEntity)[] = [
  '_id',
  'createdAt',
  'updatedAt',
  'isDeleted',
  'deletedAt',
]

export type EntityData<TEntity> = Omit<TEntity, keyof BaseEntity>

export type EntityExample<TEntity> = {
  [key in keyof Required<EntityData<TEntity>>]: Omit<
    ApiPropertyOptions,
    'example' | 'examples'
  > & {
    example?: EntityData<TEntity>[key]
    examples?: EntityData<TEntity>[key][]
  }
}

export type EntityDataExample<TEntity> = Omit<
  EntityExample<TEntity>,
  keyof BaseEntity
>

export function omitBaseEntityKeys<TEntity>(
  example: EntityExample<TEntity>,
): EntityDataExample<TEntity> {
  return omit(example, ...baseEntityKeys)
}

export function populateEntityDataExample<TEntity>(
  exampleData: EntityDataExample<TEntity>,
): EntityExample<TEntity> {
  return {
    ...exampleBaseEntity,
    ...exampleData,
  } as EntityExample<TEntity>
}

export function extractExampleEntity<TEntity>(
  exampleData: EntityDataExample<TEntity>,
  includeBaseEntityKeys = true,
) {
  let example: object = populateEntityDataExample(exampleData)
  if (!includeBaseEntityKeys) {
    example = omitBaseEntityKeys(example)
  }

  const rv: object = {}

  Object.keys(example).forEach((key) => {
    rv[key] = example[key].example
  })

  return rv as TEntity
}
