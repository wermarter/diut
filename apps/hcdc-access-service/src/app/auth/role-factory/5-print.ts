import { EntityData, PermissionRule, Role } from '@diut/hcdc'

export const printRoleFactory = (branchId: string) =>
  ({
    branchId,
    displayIndex: 5,
    name: 'In KQ',
    description: 'in được KQ của mọi người trong chi nhánh',
    permissions: [
      {
        subject: 'Patient',
        action: 'Read',
        conditions: {
          branchId,
        },
      } satisfies PermissionRule<'Patient'>,
      {
        subject: 'Sample',
        action: 'Read',
        conditions: {
          branchId,
        },
      } satisfies PermissionRule<'Sample'>,
      {
        subject: 'Sample',
        action: 'PrintResult',
        conditions: {
          branchId,
        },
      } satisfies PermissionRule<'Sample'>,
    ],
  }) satisfies EntityData<Role>
