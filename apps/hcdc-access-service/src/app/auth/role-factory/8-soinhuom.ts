import { EntityData, PermissionRule, ReportType, Role } from '@diut/hcdc'

export const soinhuomRoleFactory = (branchId: string) =>
  ({
    branchId,
    displayIndex: 8,
    name: 'Sổ soi nhuộm',
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
          type: ReportType.SoiNhuom,
        },
      } satisfies PermissionRule<'Report'>,
    ],
  }) satisfies EntityData<Role>
