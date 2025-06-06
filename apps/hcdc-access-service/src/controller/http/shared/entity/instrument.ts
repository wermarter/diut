import { exampleMongoObjectId } from '@diut/common'
import { Instrument } from '@diut/hcdc'
import { EntityDataExample } from './base-entity'

export const exampleInstrument = {
  displayIndex: {
    example: 1,
  },
  name: {
    example: 'máy xét nghiệm A',
  },
  testId: exampleMongoObjectId,
  test: {
    required: false,
  },
  branchId: exampleMongoObjectId,
  branch: {
    required: false,
  },
} satisfies EntityDataExample<Instrument>
