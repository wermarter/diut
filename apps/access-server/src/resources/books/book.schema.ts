import { BookGenre } from '@diut/common'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

import { baseSchemaOptions } from 'src/clients/mongo'
import { BOOK_COLLECTION } from 'src/common'

@Schema({
  ...baseSchemaOptions,
  collection: BOOK_COLLECTION,
})
export class Book {
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

export const bookSchema = SchemaFactory.createForClass(Book)
