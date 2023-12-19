import { AuthSubject } from './auth-subject'
import { BaseEntity, EntityExample } from './base-entity'
import { BasePermissionMapping } from './permission'

export type BioProduct = BaseEntity & {
  index: number
  name: string
}

export const exampleBioProduct: EntityExample<BioProduct> = {
  index: {
    example: 1,
    description: 'index',
  },
  name: {
    example: 'CHIV Advia centaur',
    description: 'name',
  },
}

export enum BioProductActions {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export type BioProductPermissions = BasePermissionMapping<
  AuthSubject.BioProduct,
  BioProductActions
>
