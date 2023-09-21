#!/usr/bin/env ts-node -r tsconfig-paths/register

import { SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()

import { COLLECTION } from 'src/common/collections'
import { COLLECTION_CLASS } from 'src/common/collection-classes'

async function main(collections: COLLECTION[]) {
  const [sourceDB, targetDB] = await Promise.all([
    mongoose.createConnection(process.env.SOURCE_MONGO_URI),
    mongoose.createConnection(process.env.TARGET_MONGO_URI),
  ])
  console.log('prod + dev MongoDB connected !')

  for (const collection of collections) {
    const schema = SchemaFactory.createForClass(COLLECTION_CLASS[collection])
    const sourceModel = sourceDB.model(collection, schema)
    const targetModel = targetDB.model(collection, schema)

    console.log(`Removing existing DEV ${COLLECTION_CLASS[collection].name}...`)
    await targetModel.deleteMany()

    const total = await sourceModel.countDocuments()
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
  // COLLECTION.USER,
  // COLLECTION.BIO_PRODUCT,
  // COLLECTION.DOCTOR,
  // COLLECTION.INDICATION,
  // COLLECTION.PATIENT_TYPE,
  // COLLECTION.SAMPLE_TYPE,
  // COLLECTION.TEST,
  // COLLECTION.TEST_CATEGORY,
  // COLLECTION.TEST_COMBO,
  // COLLECTION.TEST_ELEMENT,
  // COLLECTION.PRINT_FORM,
  COLLECTION.SAMPLE,
  COLLECTION.PATIENT,
])
