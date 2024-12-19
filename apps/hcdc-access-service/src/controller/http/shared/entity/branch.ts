import { exampleMongoObjectId, exampleMongoObjectIds } from '@diut/common'
import { Branch, BranchType, ReportType } from '@diut/hcdc'
import { EntityDataExample } from './base-entity'

export const exampleBranch = {
  displayIndex: {
    example: 1,
  },
  name: {
    example: 'HCDC Ba tháng hai',
  },
  address: {
    example: 'đường 3/2',
  },
  type: {
    enum: BranchType,
  },
  reportConfig: {
    example: {
      [ReportType.SinhHoa]: {
        testIds: [exampleMongoObjectId.example],
      },
    },
  },
  sampleOriginIds: exampleMongoObjectIds,
  sampleOrigins: {
    required: false,
    isArray: true,
  },
} satisfies EntityDataExample<Branch>
