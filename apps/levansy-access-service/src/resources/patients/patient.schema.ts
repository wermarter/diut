import { Gender } from '../../../../../libs/levansy-common/src'
import { Prop, Schema } from '@nestjs/mongoose'

import { BaseSchema, baseSchemaOptions } from '@diut/server-core'
import { COLLECTION } from 'src/common/collections'

@Schema({
  ...baseSchemaOptions,
  collection: COLLECTION.PATIENT,
})
export class Patient extends BaseSchema {
  @Prop()
  externalId?: string

  @Prop({ required: true, index: true })
  name: string

  @Prop({ required: true })
  gender: Gender

  @Prop({ required: true })
  birthYear: number

  @Prop()
  address?: string

  @Prop()
  phoneNumber?: string

  @Prop()
  SSN?: string
}
