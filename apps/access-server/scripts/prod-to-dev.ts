#!/usr/bin/env ts-node -r tsconfig-paths/register

import { SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()

import { COLLECTION } from 'src/common/collections'
import { COLLECTION_CLASS } from 'src/common/collection-classes'

async function main(collections: COLLECTION[]) {
  const [prodDB, devDB] = await Promise.all([
    mongoose.createConnection(process.env.PROD_MONGO_URI),
    mongoose.createConnection(process.env.DEV_MONGO_URI),
  ])
  console.log('prod + dev MongoDB connected !')

  for (const collection of collections) {
    const schema = SchemaFactory.createForClass(COLLECTION_CLASS[collection])
    const prodModel = prodDB.model(collection, schema)
    const devModel = devDB.model(collection, schema)

    console.log(`Removing existing DEV ${COLLECTION_CLASS[collection].name}...`)
    await devModel.deleteMany()

    const total = await prodModel.countDocuments()
    let counter = 0
    for await (const doc of prodModel.find().cursor()) {
      counter++
      console.log(`${counter}/${total}`)
      await devModel.insertMany(doc)
    }
    console.log(`DONE ${COLLECTION_CLASS[collection].name} !`)
  }

  await Promise.all([prodDB.close(), devDB.close()])
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
