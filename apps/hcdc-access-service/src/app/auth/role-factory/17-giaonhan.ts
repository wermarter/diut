import { EntityData, PermissionRule, ReportType, Role } from '@diut/hcdc'

export const giaonhanRoleFactory = (branchId: string) =>
  ({
    branchId,
    displayIndex: 17,
    name: 'Sổ giao nhận',
    description: '',
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
        subject: 'Report',
        action: 'Export',
        conditions: {
          branchId,
          type: ReportType.GiaoNhan,
        },
      } satisfies PermissionRule<'Report'>,
    ],
  }) satisfies EntityData<Role>
