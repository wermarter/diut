import { PrintTemplate, PrintTemplateValues } from '@diut/hcdc'
import { BaseSchema, baseSchemaOptions } from '@diut/nestjs-infra'
import { Prop, Schema } from '@nestjs/mongoose'
import { Types } from 'mongoose'
import { BranchSchema } from '../branch'
import { COLLECTION } from '../collections'

@Schema({
  ...baseSchemaOptions,
  collection: COLLECTION.PRINT_FORM,
  virtuals: {
    branch: {
      options: {
        ref: 'BranchSchema',
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

  @Prop({ required: false })
  authorTitle: string

  @Prop({ required: false })
  authorName: string

  @Prop({ required: true })
  titleMargin: number

  @Prop({ required: true, enum: PrintTemplateValues })
  template: PrintTemplate

  @Prop({ required: true, type: Types.ObjectId })
  branchId: string
  branch?: BranchSchema | null
}
