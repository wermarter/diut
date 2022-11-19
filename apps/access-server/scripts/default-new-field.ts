#!/usr/bin/env ts-node -r tsconfig-paths/register

import { SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()

import { TestElement } from 'src/resources/test-elements'
import { COLLECTION } from 'src/common/collections'

async function main() {
  await mongoose.connect(process.env.PROD_MONGO_URI)
  console.log('MongoDB connected !')

  const model = mongoose.model(
    COLLECTION.TEST_ELEMENT,
    SchemaFactory.createForClass(TestElement)
  )

  const total = await model.countDocuments({ printIndex: { $exists: false } })
  let counter = 0
  for await (const doc of model
    .find({ printIndex: { $exists: false } })
    .cursor()) {
    counter++
    console.log(`${counter}/${total}`)

    await model.updateOne(
      { _id: doc._id },
      {
        $set: {
          printIndex: doc.index,
        },
      }
    )
  }

  process.exit(0)
}

main()
