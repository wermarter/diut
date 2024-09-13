import { AssertAllKeysInArray } from '@diut/common'

export type BaseEntity = {
  _id: string

  createdAt: Date
  updatedAt: Date

  isDeleted: boolean
  deletedAt?: Date
}

export const baseEntityKeys = [
  '_id',
  'createdAt',
  'updatedAt',
  'isDeleted',
  'deletedAt',
] satisfies (keyof BaseEntity)[]

true satisfies AssertAllKeysInArray<typeof baseEntityKeys, BaseEntity>

export type EntityData<TEntity> = Omit<TEntity, keyof BaseEntity>
