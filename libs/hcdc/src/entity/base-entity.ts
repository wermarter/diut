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
type MissingKeys = Exclude<keyof BaseEntity, (typeof baseEntityKeys)[number]>
type EnsureAllKeysAreIncluded = MissingKeys extends never ? true : false
const allKeysIncluded: EnsureAllKeysAreIncluded = true

export type EntityData<TEntity> = Omit<TEntity, keyof BaseEntity>
