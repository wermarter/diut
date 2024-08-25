import { exampleMongoObjectId } from '@diut/common'
import { Diagnosis } from '@diut/hcdc'

import { EntityDataExample } from './base-entity'

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
