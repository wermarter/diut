import { EntityData, PermissionRule, ReportType, Role } from '@diut/hcdc'

export const sonhanmauRoleFactory = (branchId: string) =>
  ({
    branchId,
    displayIndex: 6,
    name: 'Sổ nhận mẫu',
    description: 'xem và download',
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
        action: 'manage',
        conditions: {
          branchId,
          type: ReportType.SoNhanMau,
        },
      } satisfies PermissionRule<'Report'>,
    ],
  }) satisfies EntityData<Role>
