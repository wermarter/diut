export type BaseEntity = {
  _id: string

  createdAt: Date
  updatedAt: Date

  isDeleted: boolean
  deletedAt?: Date
}
