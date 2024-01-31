import { exampleMongoObjectId } from '@diut/nestjs-infra'

import { EntityDataExample } from '../base-entity'
import { BioProduct } from './entity'

export const exampleBioProduct = {
  displayIndex: {
    example: 1,
  },
  name: {
    example: 'CHIV Advia centaur',
  },
  branchId: exampleMongoObjectId,
  branch: {
    required: false,
    nullable: true,
  },
} satisfies EntityDataExample<BioProduct>
