import { Gender } from '@diut/common'
import { Prop, Schema } from '@nestjs/mongoose'

import { BaseSchema, baseSchemaOptions } from 'src/clients/mongo'
import { COLLECTION } from 'src/common/collections'

@Schema({
  ...baseSchemaOptions,
  collection: COLLECTION.PATIENT,
})
export class Patient extends BaseSchema {
  @Prop()
  externalId?: string

  @Prop({ required: true, index: 'text' })
  name: string

  @Prop({ required: true })
  gender: Gender

  @Prop({ required: true })
  birthYear: number

  @Prop({ required: true })
  address: string

  @Prop()
  phoneNumber?: string

  @Prop()
  SSN?: string
}
