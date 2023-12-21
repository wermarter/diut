import { AuthSubject } from '../auth-subject'
import { EntityPermission } from '../permission'

export enum BioProductActions {
  Manage = 'manage',
  Read = 'read',
}

export type BioProductPermissions = EntityPermission<
  AuthSubject.BioProduct,
  BioProductActions
>
