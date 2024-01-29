import { exampleMongoObjectId } from '@diut/nestjs-core'

import { EntityDataExample } from '../base-entity'
import { SampleType } from './entity'

export const exampleSampleType = {
  displayIndex: {
    example: 1,
  },
  name: {
    example: 'máu',
  },
  branchId: exampleMongoObjectId,
  branch: {
    required: false,
    nullable: true,
  },
} satisfies EntityDataExample<SampleType>
