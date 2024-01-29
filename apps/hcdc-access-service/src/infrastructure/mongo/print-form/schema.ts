import { Prop, Schema } from '@nestjs/mongoose'
import { BaseSchema, baseSchemaOptions } from '@diut/nestjs-core'
import { Types } from 'mongoose'

import { COLLECTION } from '../collections'
import { BranchSchema } from '../branch'
import { PrintTemplate, PrintTemplateValues } from 'src/domain'

@Schema({
  ...baseSchemaOptions,
  collection: COLLECTION.PRINT_FORM,
  virtuals: {
    branch: {
      options: {
        ref: BranchSchema.name,
        localField: 'branchId',
        foreignField: '_id',
        justOne: true,
      },
    },
  },
})
export class PrintFormSchema extends BaseSchema {
  @Prop({ required: true })
  displayIndex: number

  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  isA4: boolean

  @Prop({ required: true })
  isAuthorLocked: boolean

  @Prop({ required: true })
  authorTitle: string

  @Prop({ required: true })
  authorName: string

  @Prop({ required: true })
  titleMargin: number

  @Prop({ required: true, enum: PrintTemplateValues })
  template: PrintTemplate

  @Prop({ required: true, type: Types.ObjectId })
  branchId: string
  branch?: BranchSchema | null
}
