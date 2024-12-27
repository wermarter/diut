import { EntityData, PermissionRule, Role } from '@diut/hcdc'

export const branchManagerRoleFactory = () =>
  ({
    branchId: '',
    displayIndex: 0,
    name: 'Quản lý các chi nhánh',
    description: '',
    permissions: [
      {
        subject: 'Branch',
        action: 'manage',
      } satisfies PermissionRule<'Branch'>,
      {
        subject: 'Role',
        action: 'manage',
      } satisfies PermissionRule<'Role'>,
    ],
  }) satisfies EntityData<Role>
