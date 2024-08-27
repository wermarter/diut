import { exampleMongoObjectId } from '@diut/common'
import { BioProduct } from '@diut/hcdc'

import { EntityDataExample } from './base-entity'

export const exampleBioProduct = {
  displayIndex: {
    example: 1,
  },
  name: {
    example: 'CHIV Advia centaur',
  },
  testId: exampleMongoObjectId,
  test: {
    required: false,
    nullable: true,
  },
  branchId: exampleMongoObjectId,
  branch: {
    required: false,
    nullable: true,
  },
} satisfies EntityDataExample<BioProduct>
