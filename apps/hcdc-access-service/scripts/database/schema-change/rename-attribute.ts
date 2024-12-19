#!/usr/bin/env -S pnpm exec ts-node -r tsconfig-paths/register
import { SchemaFactory } from '@nestjs/mongoose'
import * as dotenv from 'dotenv'
import * as mongoose from 'mongoose'
import { COLLECTION } from 'src/infra/mongo'
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
  console.log('DB connected')

  // ---------------

  let counter = 1
  const cursor = destDB
    .collection(COLLECTION.TEST)
    .find()
    .project({ _id: 1, printFormId: 1 })

  for await (const doc of cursor) {
    console.log(counter++)

    await testModel.updateOne(
      { _id: doc._id },
      {
        $set: { printFormIds: [doc.printFormId] },
        $unset: { printFormId: '' },
      },
    )
  }

  await Promise.all([destDB.close()])
  process.exit(0)
}

main()
