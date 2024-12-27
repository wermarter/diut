import { EntityData, PermissionRule, ReportType, Role } from '@diut/hcdc'

export const urineRoleFactory = (branchId: string) =>
  ({
    branchId,
    displayIndex: 10,
    name: 'Sổ Urine',
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
          type: ReportType.Urine,
        },
      } satisfies PermissionRule<'Report'>,
    ],
  }) satisfies EntityData<Role>
