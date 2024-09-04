#!/usr/bin/env -S pnpm exec ts-node -r tsconfig-paths/register
import { SchemaFactory } from '@nestjs/mongoose'
import * as dotenv from 'dotenv'
import { omit } from 'es-toolkit'
import * as mongoose from 'mongoose'

import { COLLECTION } from 'src/infra/mongo'
import { RoleRepository, RoleSchema } from 'src/infra/mongo/role'
dotenv.config()

async function main(
  srcBranchId = '661cab3f3488c55263f7265e',
  destBranchId = '661e1d78e3e5260ffd92ea75',
) {
  const [destDB] = await Promise.all([
    mongoose.createConnection(process.env.DEST_MONGO_URI!).asPromise(),
  ])
  console.log('DB connected')

  const roleModel = destDB.model(
    COLLECTION.ROLE,
    SchemaFactory.createForClass(RoleSchema),
  )
  const roleRepo = new RoleRepository(roleModel)

  // ---------------
  const roles = (
    await roleRepo.search({
      filter: { branchId: srcBranchId },
    })
  ).items

  console.log(`Found ${roles.length} Roles`)

  for (const role of roles) {
    const modifiedRole = JSON.parse(
      JSON.stringify(omit(role, ['_id', 'createdAt', 'updatedAt'])).replaceAll(
        srcBranchId,
        destBranchId,
      ),
    )

    await roleRepo.create(modifiedRole)
  }

  await Promise.all([destDB.close()])
  process.exit(0)
}

main()
