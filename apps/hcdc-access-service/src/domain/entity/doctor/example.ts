import { exampleMongoObjectId } from '@diut/nestjs-core'

import { EntityDataExample } from '../base-entity'
import { Doctor } from './entity'

export const exampleDoctor = {
  displayIndex: {
    example: 1,
  },
  name: {
    example: 'Lê Văn Doctor',
  },
  branchId: exampleMongoObjectId,
  branch: {
    required: false,
    nullable: true,
  },
} satisfies EntityDataExample<Doctor>
