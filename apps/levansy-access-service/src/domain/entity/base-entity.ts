export type BaseEntity = {
  _id: string

  createdAt: Date
  updatedAt: Date
}

export type EntityData<TEntity extends BaseEntity> = Omit<
  TEntity,
  keyof BaseEntity
>

export type EntityExample<TEntity extends BaseEntity> = {
  [key in keyof EntityData<TEntity>]: {
    example: EntityData<TEntity>[key]
    description: string
  }
}
