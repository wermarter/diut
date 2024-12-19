import { exampleMongoObjectId } from '@diut/common'
import { Doctor } from '@diut/hcdc'
import { EntityDataExample } from './base-entity'

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
