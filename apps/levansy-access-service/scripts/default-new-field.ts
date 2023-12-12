#!/usr/bin/env -S pnpm exec ts-node -r tsconfig-paths/register

import { SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()

import { COLLECTION } from 'src/infrastructure/mongo/collections'
import { Test } from 'src/resources/tests/test.schema'

async function main() {
  const db = await mongoose.connect(process.env.TARGET_MONGO_URI)
  console.log('MongoDB connected !')

  const model = mongoose.model(
    COLLECTION.TEST,
    SchemaFactory.createForClass(Test),
  )

  const filterQuery: mongoose.FilterQuery<Test> = {
    shouldDisplayWithChildren: { $exists: false },
  }

  const total = await model.countDocuments(filterQuery).exec()
  let counter = 0

  for await (const doc of model.find(filterQuery).cursor()) {
    counter++
    console.log(`${counter}/${total}`)

    await model
      .updateOne(
        { _id: doc._id },
        {
          $set: {
            shouldDisplayWithChildren: true,
          },
        },
      )
      .exec()
  }

  await db.disconnect()
  process.exit(0)
}

main()
