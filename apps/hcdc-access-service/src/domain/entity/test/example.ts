import { exampleMongoObjectId } from '@diut/nest-core'

import { EntityDataExample } from '../base-entity'
import { Test } from './entity'

export const exampleTest = {
  displayIndex: {
    example: 1,
  },
  name: {
    example: 'CHIV Advia centaur',
  },
  shouldNotPrint: {},
  shouldDisplayWithChildren: {},
  branchId: exampleMongoObjectId,
  branch: {
    required: false,
  },
} satisfies EntityDataExample<Test>
