import { Gender } from '@diut/common'
import { Prop, Schema } from '@nestjs/mongoose'

import { BaseSchema, baseSchemaOptions } from 'src/clients/mongo'
import { COLLECTION } from 'src/common/collections'

@Schema({
  ...baseSchemaOptions,
  collection: COLLECTION.PATIENT,
})
export class Patient extends BaseSchema {
  @Prop({ required: true })
  externalId: string

  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  gender: Gender

  @Prop({ required: true })
  birthYear: number

  @Prop({ required: true })
  address: string

  @Prop({ required: true })
  phoneNumber: string

  @Prop({ required: true })
  SSN: string
}
