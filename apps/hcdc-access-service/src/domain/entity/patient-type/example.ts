import { exampleMongoObjectId } from '@diut/nestjs-core'

import { EntityDataExample } from '../base-entity'
import { PatientType } from './entity'

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
