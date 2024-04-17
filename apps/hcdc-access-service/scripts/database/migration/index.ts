#!/usr/bin/env -S pnpm exec ts-node -r tsconfig-paths/register
import * as mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()

import { migrateDiagnosis } from './diagnosis'
import { migrateDoctor } from './doctor'
import { migratePatientType } from './patient-type'
import { migratePrintForm } from './print-form'
import { migrateSampleType } from './sample-type'
import { migrateTestCategory } from './test-category'
import { migrateTest } from './test'
import { migrateTestElement } from './test-element'
import { migrateTestCombo } from './test-combo'
import { migrateUser } from './user'
import { migratePatient } from './patient'
import { migrateSample } from './sample'

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
  // await migratePatient(sourceDB, destDB)
  // await migrateSample(sourceDB, destDB)

  await Promise.all([sourceDB.close(), destDB.close()])
  process.exit(0)
}

main()
