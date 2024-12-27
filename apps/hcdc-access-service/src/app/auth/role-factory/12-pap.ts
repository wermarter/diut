import { EntityData, PermissionRule, ReportType, Role } from '@diut/hcdc'

export const papRoleFactory = (branchId: string) =>
  ({
    branchId,
    displayIndex: 12,
    name: 'Sổ Pap',
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
          type: ReportType.Pap,
        },
      } satisfies PermissionRule<'Report'>,
    ],
  }) satisfies EntityData<Role>
