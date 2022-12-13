#!/usr/bin/env ts-node -r tsconfig-paths/register

import { SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()

import { COLLECTION } from 'src/common/collections'
import { Patient } from 'src/resources/patients/patient.schema'
import { Gender } from '@diut/common'

async function main() {
  const [prodDB, devDB] = await Promise.all([
    mongoose.createConnection(process.env.PROD_MONGO_URI),
    mongoose.createConnection(process.env.DEV_MONGO_URI),
  ])
  console.log('prod + dev MongoDB connected !')

  const schema = SchemaFactory.createForClass(Patient)
  const prodModel = prodDB.model(COLLECTION.PATIENT, schema)
  const devModel = devDB.model(COLLECTION.PATIENT, schema)

  console.log(`Removing existing DEV ${Patient.name}...`)
  await devModel.deleteMany()

  const total = await prodModel.countDocuments()
  let counter = 0
  for await (const doc of prodModel.find().cursor()) {
    counter++
    console.log(`${counter}/${total}`)
    await devModel.insertMany({
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

  await Promise.all([prodDB.close(), devDB.close()])
  process.exit(0)
}

main()
