import { Prop, Schema } from '@nestjs/mongoose'

import { BaseSchema, baseSchemaOptions } from 'src/clients/mongo'
import { COLLECTION } from 'src/common/collections'

@Schema({
  ...baseSchemaOptions,
  collection: COLLECTION.PRINT_FORM,
})
export class PrintForm extends BaseSchema {
  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  filename: string

  @Prop({ required: true })
  index: number

  @Prop({ required: true })
  isAuthorLocked: boolean

  @Prop({ required: true })
  isA4: boolean

  @Prop()
  authorPosition?: string

  @Prop()
  authorName?: string

  @Prop()
  titleMargin?: number
}
