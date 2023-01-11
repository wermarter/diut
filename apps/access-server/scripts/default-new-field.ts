#!/usr/bin/env ts-node -r tsconfig-paths/register

import { SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()

import { COLLECTION } from 'src/common/collections'
import { TestElement } from 'src/resources/test-elements/test-element.schema'

async function main() {
  const db = await mongoose.connect(process.env.PROD_MONGO_URI)
  console.log('MongoDB connected !')

  const model = mongoose.model(
    COLLECTION.TEST_ELEMENT,
    SchemaFactory.createForClass(TestElement)
  )

  const filterQuery: mongoose.FilterQuery<TestElement> = {
    reportOrder: { $exists: false },
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
          reportOrder: doc.printIndex,
        },
      }
    )
  }

  await db.disconnect()
  process.exit(0)
}

main()
