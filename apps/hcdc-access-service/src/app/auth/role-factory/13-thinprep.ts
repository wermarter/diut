import { EntityData, PermissionRule, ReportType, Role } from '@diut/hcdc'

export const thinprepRoleFactory = (branchId: string) =>
  ({
    branchId,
    displayIndex: 13,
    name: 'Sổ Thinprep',
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
          type: ReportType.Thinprep,
        },
      } satisfies PermissionRule<'Report'>,
    ],
  }) satisfies EntityData<Role>
