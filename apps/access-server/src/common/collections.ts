import { Schema } from 'mongoose'

export enum COLLECTION {
  BOOK = 'books',
}

export const DB_REF = {
  BOOK: {
    type: Schema.Types.ObjectId,
    ref: COLLECTION.BOOK,
  },
}
