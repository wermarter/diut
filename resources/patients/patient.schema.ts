import { Gender } from '@diut/hcdc-common'
import { Prop, Schema } from '@nestjs/mongoose'

import { BaseSchema, baseSchemaOptions } from '@diut/nest-core'
import { COLLECTION } from 'src/infrastructure/mongo/collections'

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
