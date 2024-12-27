import { EntityData, PermissionRule, Role } from '@diut/hcdc'

export const resultRoleFactory = (branchId: string) =>
  ({
    branchId,
    displayIndex: 4,
    name: 'Nhập KQ',
    description: 'chỉ nhập được KQ của mình hoặc chưa bị khóa',
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
        action: 'UpdateResult',
        conditions: {
          branchId,
        },
      } satisfies PermissionRule<'Sample'>,
      {
        subject: 'SampleTestResult',
        action: 'Modify',
        conditions: {
          $or: [
            {
              isLocked: false,
            },
            {
              resultById: '{{user._id}}',
            },
          ],
        },
      } satisfies PermissionRule<'SampleTestResult'>,
    ],
  }) satisfies EntityData<Role>
