import { BookGenre } from '@diut/common'
import { Prop, Schema } from '@nestjs/mongoose'

import { BaseSchema, baseSchemaOptions } from 'src/clients/mongo'
import { COLLECTION } from 'src/common'

@Schema({
  ...baseSchemaOptions,
  collection: COLLECTION.BOOK,
})
export class Book extends BaseSchema {
  @Prop()
  name: string

  @Prop({
    type: String,
    enum: BookGenre,
  })
  genre: BookGenre

  @Prop()
  stock: number
}
