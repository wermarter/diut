import { EntityData, ExternalRoutePath, PermissionRule, Role } from '@diut/hcdc'

export const infoRoleFactory = (branchId: string) =>
  ({
    branchId,
    displayIndex: 3,
    name: 'Nhập thông tin',
    description: 'nhập TT + xác nhận TT + tìm kiếm + in phiếu hẹn',
    permissions: [
      {
        subject: 'Patient',
        action: 'Read',
        conditions: {
          branchId,
        },
      } satisfies PermissionRule<'Patient'>,
      {
        subject: 'Patient',
        action: 'Create',
        conditions: {
          branchId,
        },
      } satisfies PermissionRule<'Patient'>,
      {
        subject: 'Patient',
        action: 'Update',
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
        action: 'Create',
        conditions: {
          branchId,
        },
      } satisfies PermissionRule<'Sample'>,
      {
        subject: 'Sample',
        action: 'UpdateInfo',
        conditions: {
          branchId,
        },
      } satisfies PermissionRule<'Sample'>,
      {
        subject: 'ExternalRoute',
        action: 'Generate',
        conditions: {
          branchId,
          path: ExternalRoutePath.GetSampleResult,
        },
      } satisfies PermissionRule<'ExternalRoute'>,
    ],
  }) satisfies EntityData<Role>
