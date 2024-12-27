import { EntityData, PermissionRule, Role } from '@diut/hcdc'

export const userRoleFactory = (branchId: string) =>
  ({
    branchId,
    displayIndex: 1,
    name: 'Người dùng',
    description: 'luôn chọn',
    permissions: [
      {
        subject: 'Branch',
        action: 'Read',
        conditions: {
          _id: branchId,
        },
      } satisfies PermissionRule<'Branch'>,
      {
        subject: 'User',
        action: 'Read',
        conditions: {
          branchIds: branchId,
        },
      } satisfies PermissionRule<'User'>,
      {
        subject: 'User',
        action: 'ChangePassword',
        conditions: {
          _id: '{{user._id}}',
        },
      } satisfies PermissionRule<'User'>,
      {
        subject: 'PrintForm',
        action: 'Read',
        conditions: {
          branchId: branchId,
        },
      } satisfies PermissionRule<'PrintForm'>,
      {
        subject: 'BioProduct',
        action: 'Read',
        conditions: {
          branchId: branchId,
        },
      } satisfies PermissionRule<'BioProduct'>,
      {
        subject: 'Instrument',
        action: 'Read',
        conditions: {
          branchId: branchId,
        },
      } satisfies PermissionRule<'Instrument'>,
      {
        subject: 'SampleType',
        action: 'Read',
        conditions: {
          branchId: branchId,
        },
      } satisfies PermissionRule<'SampleType'>,
      {
        subject: 'Doctor',
        action: 'Read',
        conditions: {
          branchId: branchId,
        },
      } satisfies PermissionRule<'Doctor'>,
      {
        subject: 'PatientType',
        action: 'Read',
        conditions: {
          branchId: branchId,
        },
      } satisfies PermissionRule<'PatientType'>,
      {
        subject: 'Diagnosis',
        action: 'Read',
        conditions: {
          branchId: branchId,
        },
      } satisfies PermissionRule<'Diagnosis'>,
      {
        subject: 'TestCategory',
        action: 'Read',
        conditions: {
          branchId: branchId,
        },
      } satisfies PermissionRule<'TestCategory'>,
      {
        subject: 'TestElement',
        action: 'Read',
        conditions: {
          branchId: branchId,
        },
      } satisfies PermissionRule<'TestElement'>,
      {
        subject: 'Test',
        action: 'Read',
        conditions: {
          branchId: branchId,
        },
      } satisfies PermissionRule<'Test'>,
      {
        subject: 'TestCombo',
        action: 'Read',
        conditions: {
          branchId: branchId,
        },
      } satisfies PermissionRule<'TestCombo'>,
    ],
  }) satisfies EntityData<Role>
