import { MongoQuery } from '@ucast/mongo'

import { BaseEntity } from './base-entity'

export type Permission = BaseEntity & {
  index: number
  name: string
  description: string
  rule: {
    inverted: boolean
    actions: string[]
    subjects: string[]
    conditions: MongoQuery
  }
}

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export enum Subject {
  WebApp = 'web-app',
  BioProduct = 'bio-product',
  Permission = 'permission',
  Role = 'role',
  User = 'user',
}
