#!/usr/bin/env -S pnpm exec ts-node -r tsconfig-paths/register

import { SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()

import { COLLECTION } from 'src/infrastructure/mongo/collections'
import { Patient } from 'src/resources/patients/patient.schema'
import { Gender } from '@diut/levansy-common'

async function main() {
  const [sourceDB, targetDB] = await Promise.all([
    mongoose.createConnection(process.env.SOURCE_MONGO_URI).asPromise(),
    mongoose.createConnection(process.env.TARGET_MONGO_URI).asPromise(),
  ])
  console.log('prod + dev MongoDB connected !')

  const schema = SchemaFactory.createForClass(Patient)
  const sourceModel = sourceDB.model(COLLECTION.PATIENT, schema)
  const targetModel = targetDB.model(COLLECTION.PATIENT, schema)

  console.log(`Removing existing DEV ${Patient.name}...`)
  await targetModel.deleteMany().exec()

  const total = await sourceModel.countDocuments().exec()
  let counter = 0
  for await (const doc of sourceModel.find().cursor()) {
    counter++
    console.log(`${counter}/${total}`)
    await targetModel.insertMany({
      _id: doc._id,
      birthYear: doc.birthYear ?? 2000,
      gender: doc.gender ?? Gender.Female,
      address: 'QUẬN X - HCM',
      name: 'Anonymous Patient',
      SSN: doc.SSN?.length > 0 ? '1234567890' : undefined,
      phoneNumber: doc.phoneNumber?.length > 0 ? '1234567890' : undefined,
      externalId: doc.externalId?.length > 0 ? '1234567890' : undefined,
    })
  }
  console.log(`DONE ${Patient.name} !`)

  await Promise.all([sourceDB.close(), targetDB.close()])
  process.exit(0)
}

main()
