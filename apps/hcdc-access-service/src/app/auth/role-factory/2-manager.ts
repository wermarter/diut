import { EntityData, PermissionRule, Role } from '@diut/hcdc'

export const managerRoleFactory = (branchId: string) =>
  ({
    branchId,
    displayIndex: 2,
    name: 'Quản lý',
    description: 'toàn quyền trong chi nhánh',
    permissions: [
      {
        subject: 'Branch',
        action: 'AuthorizeUser',
        conditions: {
          _id: branchId,
        },
      } satisfies PermissionRule<'Branch'>,
      {
        subject: 'Branch',
        action: 'DeauthorizeUser',
        conditions: {
          _id: branchId,
        },
      } satisfies PermissionRule<'Branch'>,
      {
        subject: 'Branch',
        action: 'Update',
        conditions: {
          _id: branchId,
        },
      } satisfies PermissionRule<'Branch'>,
      {
        subject: 'Role',
        action: 'Read',
        conditions: {
          branchId,
        },
      } satisfies PermissionRule<'Role'>,
      {
        subject: 'Role',
        action: 'AssignToUser',
        conditions: {
          branchId,
        },
      } satisfies PermissionRule<'Role'>,
      {
        subject: 'User',
        action: 'manage',
        conditions: {
          branchIds: branchId,
        },
      } satisfies PermissionRule<'User'>,
      {
        inverted: true,
        subject: 'User',
        action: 'Delete',
        conditions: {
          branchIds: branchId,
        },
      } satisfies PermissionRule<'User'>,
      {
        subject: 'PrintForm',
        action: 'manage',
        conditions: {
          branchId,
        },
      } satisfies PermissionRule<'PrintForm'>,
      {
        subject: 'BioProduct',
        action: 'manage',
        conditions: {
          branchId,
        },
      } satisfies PermissionRule<'BioProduct'>,
      {
        subject: 'Instrument',
        action: 'manage',
        conditions: {
          branchId,
        },
      } satisfies PermissionRule<'Instrument'>,
      {
        subject: 'SampleType',
        action: 'manage',
        conditions: {
          branchId,
        },
      } satisfies PermissionRule<'SampleType'>,
      {
        subject: 'Doctor',
        action: 'manage',
        conditions: {
          branchId,
        },
      } satisfies PermissionRule<'Doctor'>,
      {
        subject: 'PatientType',
        action: 'manage',
        conditions: {
          branchId,
        },
      } satisfies PermissionRule<'PatientType'>,
      {
        subject: 'Diagnosis',
        action: 'manage',
        conditions: {
          branchId,
        },
      } satisfies PermissionRule<'Diagnosis'>,
      {
        subject: 'TestCategory',
        action: 'manage',
        conditions: {
          branchId,
        },
      } satisfies PermissionRule<'TestCategory'>,
      {
        subject: 'TestElement',
        action: 'manage',
        conditions: {
          branchId,
        },
      } satisfies PermissionRule<'TestElement'>,
      {
        subject: 'Test',
        action: 'manage',
        conditions: {
          branchId,
        },
      } satisfies PermissionRule<'Test'>,
      {
        subject: 'TestCombo',
        action: 'manage',
        conditions: {
          branchId,
        },
      } satisfies PermissionRule<'TestCombo'>,
      {
        subject: 'Patient',
        action: 'manage',
        conditions: {
          branchId,
        },
      } satisfies PermissionRule<'Patient'>,
      {
        subject: 'Sample',
        action: 'manage',
        conditions: {
          branchId,
        },
      } satisfies PermissionRule<'Sample'>,
      {
        subject: 'SampleTestResult',
        action: 'manage',
      } satisfies PermissionRule<'SampleTestResult'>,
      {
        subject: 'Report',
        action: 'manage',
      } satisfies PermissionRule<'Report'>,
    ],
  }) satisfies EntityData<Role>
