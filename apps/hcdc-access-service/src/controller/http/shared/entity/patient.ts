import { exampleMongoObjectId } from '@diut/common'
import { Patient, PatientGender } from '@diut/hcdc'

import { EntityDataExample } from './base-entity'

export const examplePatient = {
  externalId: {
    example: '1220406272',
  },
  name: {
    example: 'Lê Văn Patient',
  },
  gender: {
    enum: PatientGender,
  },
  birthYear: {
    example: 2000,
  },
  address: {
    example: 'QUẬN 7 - HCM',
  },
  phoneNumber: {
    example: '0987654321',
  },
  SSN: {
    example: '080200001111',
  },
  branchId: exampleMongoObjectId,
  branch: {
    required: false,
    nullable: true,
  },
} satisfies EntityDataExample<Patient>
