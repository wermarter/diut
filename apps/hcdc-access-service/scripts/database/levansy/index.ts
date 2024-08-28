#!/usr/bin/env -S pnpm exec ts-node -r tsconfig-paths/register
import * as dotenv from 'dotenv'
import * as mongoose from 'mongoose'
dotenv.config()

// mongoose.set('debug', true)

async function main() {
  const [sourceDB, destDB] = await Promise.all([
    mongoose.createConnection(process.env.SOURCE_MONGO_URI!).asPromise(),
    mongoose.createConnection(process.env.DEST_MONGO_URI!).asPromise(),
  ])
  console.log('DB connected')

  // await migrateDiagnosis(sourceDB, destDB)
  // await migrateDoctor(sourceDB, destDB)
  // await migratePatientType(sourceDB, destDB)
  // await migratePrintForm(sourceDB, destDB)
  // await migrateSampleType(sourceDB, destDB)
  // const testCategoryIdMap = await migrateTestCategory(sourceDB, destDB)
  // const testIdMap = await migrateTest(sourceDB, destDB, testCategoryIdMap)
  // await migrateTestElement(sourceDB, destDB, testIdMap)
  // await migrateTestCombo(sourceDB, destDB, testIdMap)
  // const patientIds = await migrateSample(sourceDB, destDB)
  // await migratePatient(sourceDB, destDB, patientIds)

  await Promise.all([sourceDB.close(), destDB.close()])
  process.exit(0)
}

main()
