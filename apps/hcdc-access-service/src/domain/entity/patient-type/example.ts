import { exampleMongoObjectId } from '@diut/nest-core'

import { EntityDataExample } from '../base-entity'
import { PatientType } from './entity'

export const examplePatientType = {
  displayIndex: {
    example: 1,
  },
  name: {
    example: 'CHIV Advia centaur',
  },
  branchId: exampleMongoObjectId,
  branch: {
    required: false,
  },
} satisfies EntityDataExample<PatientType>
