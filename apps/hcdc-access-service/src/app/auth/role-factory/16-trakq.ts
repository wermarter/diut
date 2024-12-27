import { EntityData, PermissionRule, ReportType, Role } from '@diut/hcdc'

export const trakqRoleFactory = (branchId: string) =>
  ({
    branchId,
    displayIndex: 16,
    name: 'Sổ trả KQ',
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
          type: ReportType.TraKQ,
        },
      } satisfies PermissionRule<'Report'>,
    ],
  }) satisfies EntityData<Role>
