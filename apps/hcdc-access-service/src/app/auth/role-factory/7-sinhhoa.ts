import { EntityData, PermissionRule, ReportType, Role } from '@diut/hcdc'

export const sinhhoaRoleFactory = (branchId: string) =>
  ({
    branchId,
    displayIndex: 7,
    name: 'Sổ sinh hóa',
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
          type: ReportType.SoNhanMau,
        },
      } satisfies PermissionRule<'Report'>,
    ],
  }) satisfies EntityData<Role>
