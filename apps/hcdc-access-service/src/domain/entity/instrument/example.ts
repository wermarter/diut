import { exampleMongoObjectId } from '@diut/nestjs-infra'

import { EntityDataExample } from '../base-entity'
import { Instrument } from './entity'

export const exampleInstrument = {
  displayIndex: {
    example: 1,
  },
  name: {
    example: 'máy xét nghiệm A',
  },
  branchId: exampleMongoObjectId,
  branch: {
    required: false,
    nullable: true,
  },
} satisfies EntityDataExample<Instrument>
