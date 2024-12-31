import { exampleMongoObjectId } from '@diut/common'
import { SampleType } from '@diut/hcdc'
import { EntityDataExample } from './base-entity'

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
  },
} satisfies EntityDataExample<SampleType>
