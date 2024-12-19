#!/usr/bin/env -S pnpm exec ts-node -r tsconfig-paths/register
import * as dotenv from 'dotenv'
import * as mongoose from 'mongoose'
import { migratePatient } from './patient'
import { migrateSample } from './sample'
dotenv.config()

// mongoose.set('debug', true)

async function main() {
  const [sourceDB, destDB] = await Promise.all([
    mongoose.createConnection(process.env.SOURCE_MONGO_URI!).asPromise(),
    mongoose.createConnection(process.env.DEST_MONGO_URI!).asPromise(),
  ])
  console.log('DB connected')

  // await migrateUser(sourceDB, destDB)
  // await migrateDiagnosis(sourceDB, destDB)
  // await migrateDoctor(sourceDB, destDB)
  // await migratePatientType(sourceDB, destDB)
  // await migratePrintForm(sourceDB, destDB)
  // await migrateSampleType(sourceDB, destDB)
  // await migrateTestCategory(sourceDB, destDB)
  // await migrateTest(sourceDB, destDB)
  // await migrateTestElement(sourceDB, destDB)
  // await migrateTestCombo(sourceDB, destDB)
  await migratePatient(sourceDB, destDB)
  await migrateSample(sourceDB, destDB)

  await Promise.all([sourceDB.close(), destDB.close()])
  process.exit(0)
}

main()
