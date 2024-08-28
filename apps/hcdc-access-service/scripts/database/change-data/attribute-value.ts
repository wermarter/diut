#!/usr/bin/env -S pnpm exec ts-node -r tsconfig-paths/register
import { SchemaFactory } from '@nestjs/mongoose'
import * as dotenv from 'dotenv'
import * as mongoose from 'mongoose'

import { COLLECTION } from 'src/infra'
import { TestSchema } from 'src/infra/mongo/test'
dotenv.config()

async function main() {
  const [destDB] = await Promise.all([
    mongoose.createConnection(process.env.DEST_MONGO_URI!).asPromise(),
  ])
  const testModel = destDB.model(
    COLLECTION.TEST,
    SchemaFactory.createForClass(TestSchema),
  )

  // ---------------

  let counter = 1
  const cursor = destDB
    .collection(COLLECTION.TEST)
    .find()
    .project({ _id: 1, printFormIds: 1 })

  for await (const doc of cursor) {
    console.log(counter++)

    if (doc.printFormIds?.[0] === null) {
      await testModel.updateOne(
        { _id: doc._id },
        {
          $set: { printFormIds: [] },
        },
      )
      console.log(doc._id)
    }
  }

  await Promise.all([destDB.close()])
  process.exit(0)
}

main()
