import { exampleMongoObjectId } from '@diut/nest-core'

import { EntityDataExample } from '../base-entity'
import { Diagnosis } from './entity'

export const exampleDiagnosis = {
  displayIndex: {
    example: 1,
  },
  name: {
    example: 'kiểm tra sức khỏe',
  },
  branchId: exampleMongoObjectId,
  branch: {
    required: false,
    nullable: true,
  },
} satisfies EntityDataExample<Diagnosis>
