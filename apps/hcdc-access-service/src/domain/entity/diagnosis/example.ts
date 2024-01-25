import { exampleMongoObjectId } from '@diut/nest-core'

import { EntityDataExample } from '../base-entity'
import { Diagnosis } from './entity'

export const exampleDiagnosis = {
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
} satisfies EntityDataExample<Diagnosis>
