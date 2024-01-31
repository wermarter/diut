import { exampleMongoObjectId } from '@diut/nestjs-infra'

import { EntityDataExample } from '../base-entity'
import { PrintForm, PrintTemplate } from './entity'

export const examplePrintForm = {
  displayIndex: {
    example: 1,
  },
  name: {
    example: 'form chung',
  },
  isA4: {},
  isAuthorLocked: {},
  authorTitle: {
    example: 'Chức vụ',
  },
  authorName: {
    example: 'Nguyễn Văn A',
  },
  titleMargin: { example: 12 },
  template: {
    enum: PrintTemplate,
  },
  branchId: exampleMongoObjectId,
  branch: {
    required: false,
    nullable: true,
  },
} satisfies EntityDataExample<PrintForm>
