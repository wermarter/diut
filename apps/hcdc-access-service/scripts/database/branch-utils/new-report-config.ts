#!/usr/bin/env -S pnpm exec ts-node -r tsconfig-paths/register
import { ReportType } from '@diut/hcdc'
import { SchemaFactory } from '@nestjs/mongoose'
import * as dotenv from 'dotenv'
import * as mongoose from 'mongoose'

import { COLLECTION } from 'src/infra'
import { BranchRepository, BranchSchema } from 'src/infra/mongo/branch'
import { TestRepository, TestSchema } from 'src/infra/mongo/test'
// import { branchId } from '../migration/branch'
dotenv.config()

async function main() {
  const [destDB] = await Promise.all([
    mongoose.createConnection(process.env.DEST_MONGO_URI!).asPromise(),
  ])
  console.log('DB connected')

  const branchModel = destDB.model(
    COLLECTION.BRANCH,
    SchemaFactory.createForClass(BranchSchema),
  )
  const branchRepo = new BranchRepository(branchModel)
  const testModel = destDB.model(
    COLLECTION.TEST,
    SchemaFactory.createForClass(TestSchema),
  )
  const testRepo = new TestRepository(testModel)

  // ---------------
  const tests = await testRepo.search({
    filter: { testCategoryId: '661e922489866edff2c9f0d4' },
    projection: { _id: 1 },
  })

  console.log(`Found ${tests.items.length} Tests`)

  await branchRepo.update(
    { _id: '661e1d78e3e5260ffd92ea75' },
    {
      [`reportConfig.${ReportType.SinhHoa}.testIds`]: tests.items.map(
        ({ _id }) => _id,
      ),
    },
  )

  await Promise.all([destDB.close()])
  process.exit(0)
}

main()
