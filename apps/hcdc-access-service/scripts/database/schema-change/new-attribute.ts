#!/usr/bin/env -S pnpm exec ts-node -r tsconfig-paths/register
import { Sample } from '@diut/hcdc'
import { SchemaFactory } from '@nestjs/mongoose'
import * as dotenv from 'dotenv'
import * as mongoose from 'mongoose'
import { COLLECTION } from 'src/infra/mongo'
import { SampleSchema } from 'src/infra/mongo/sample'
dotenv.config()

async function main() {
  const [destDB] = await Promise.all([
    mongoose.createConnection(process.env.DEST_MONGO_URI!).asPromise(),
  ])
  const model = destDB.model(
    COLLECTION.SAMPLE,
    SchemaFactory.createForClass(SampleSchema),
  )

  // ---------------

  let counter = 1
  const cursor = destDB
    .collection(COLLECTION.SAMPLE)
    .find()
    .project({ _id: 1, isLocked: 1 })

  for await (const doc of cursor) {
    console.log(counter++)
    const entity = doc as Sample

    if (entity.isLocked === undefined) {
      await model.updateOne(
        { _id: doc._id },
        {
          $set: { isLocked: false },
        },
      )
      // console.log(doc._id)
    }
  }

  await Promise.all([destDB.close()])
  process.exit(0)
}

main()
