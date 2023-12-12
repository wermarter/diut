#!/usr/bin/env -S pnpm exec ts-node -r tsconfig-paths/register

import { SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()

import { COLLECTION } from 'src/infrastructure/mongo/collections'
import { COLLECTION_CLASS } from 'src/common/collection-classes'

async function main(collections: COLLECTION[]) {
  const [sourceDB, targetDB] = await Promise.all([
    mongoose.createConnection(process.env.SOURCE_MONGO_URI).asPromise(),
    mongoose.createConnection(process.env.TARGET_MONGO_URI).asPromise(),
  ])
  console.log('prod + dev MongoDB connected !')

  for (const collection of collections) {
    const schema = SchemaFactory.createForClass(COLLECTION_CLASS[collection])
    const sourceModel = sourceDB.model(collection, schema)
    const targetModel = targetDB.model(collection, schema)

    console.log(`Removing existing DEV ${COLLECTION_CLASS[collection].name}...`)
    await targetModel.deleteMany().exec()

    const total = await sourceModel.countDocuments().exec()
    let counter = 0
    for await (const doc of sourceModel.find().cursor()) {
      counter++
      console.log(`${counter}/${total}`)
      await targetModel.insertMany(doc)
    }
    console.log(`DONE ${COLLECTION_CLASS[collection].name} !`)
  }

  await Promise.all([sourceDB.close(), targetDB.close()])
  process.exit(0)
}

main([
  COLLECTION.USER,
  COLLECTION.BIO_PRODUCT,
  COLLECTION.DOCTOR,
  COLLECTION.INDICATION,
  COLLECTION.PATIENT_TYPE,
  COLLECTION.SAMPLE_TYPE,
  COLLECTION.TEST,
  COLLECTION.TEST_CATEGORY,
  COLLECTION.TEST_COMBO,
  COLLECTION.TEST_ELEMENT,
  COLLECTION.PRINT_FORM,
  COLLECTION.SAMPLE_ORIGIN,
  COLLECTION.SAMPLE,
  COLLECTION.PATIENT,
])
