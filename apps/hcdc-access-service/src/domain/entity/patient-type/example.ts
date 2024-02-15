import { exampleMongoObjectId } from '@diut/common'
import { PatientType } from '@diut/hcdc'

import { EntityDataExample } from '../base-entity'

export const examplePatientType = {
  displayIndex: {
    example: 1,
  },
  name: {
    example: 'dịch vụ',
  },
  branchId: exampleMongoObjectId,
  branch: {
    required: false,
    nullable: true,
  },
} satisfies EntityDataExample<PatientType>
