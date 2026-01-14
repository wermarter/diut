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
  @Prop({ required: true, type: Number })
  displayIndex: number

  @Prop({ required: true, type: String })
  name: string

  @Prop({ required: true, type: Boolean })
  isA4: boolean

  @Prop({ required: true, type: Boolean })
  isAuthorLocked: boolean

  @Prop({ required: false, type: String })
  authorTitle: string

  @Prop({ required: false, type: String })
  authorName: string

  @Prop({ required: true, type: Number })
  titleMargin: number

  @Prop({ required: true, enum: PrintTemplateValues, type: String })
  template: PrintTemplate

  @Prop({ required: true, type: Types.ObjectId })
  branchId: string
  branch?: BranchSchema
}
