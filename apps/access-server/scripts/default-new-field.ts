#!/usr/bin/env ts-node -r tsconfig-paths/register

import { SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()

import { Sample } from 'src/resources/samples'
import { COLLECTION } from 'src/common/collections'

async function main() {
  const db = await mongoose.connect(process.env.PROD_MONGO_URI)
  console.log('MongoDB connected !')

  const model = mongoose.model(
    COLLECTION.SAMPLE,
    SchemaFactory.createForClass(Sample)
  )

  const filterQuery: mongoose.FilterQuery<Sample> = {
    isNgoaiGio: { $exists: false },
    isTraBuuDien: { $exists: false },
  }

  const total = await model.countDocuments(filterQuery)
  let counter = 0

  for await (const doc of model.find(filterQuery).cursor()) {
    counter++
    console.log(`${counter}/${total}`)

    await model.updateOne(
      { _id: doc._id },
      {
        $set: {
          isNgoaiGio: false,
          isTraBuuDien: false,
        },
      }
    )
  }

  await db.disconnect()
  process.exit(0)
}

main()
