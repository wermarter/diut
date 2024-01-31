#!/usr/bin/env -S pnpm exec ts-node -r tsconfig-paths/register
import * as mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import { SchemaFactory } from '@nestjs/mongoose'

import { SampleSchema } from 'src/infra/mongo/sample'
import { COLLECTION } from 'src/infra'
dotenv.config()

mongoose.set('debug', true)

async function main() {
  const [sourceDB] = await Promise.all([
    mongoose.createConnection(process.env.DEST_MONGO_URI!).asPromise(),
  ])
  console.log('DB connected')

  const schema = SchemaFactory.createForClass(SampleSchema)
  const model = sourceDB.model(COLLECTION.SAMPLE, schema)

  const indexName = await model.collection.createIndex(
    { sampleId: 1 },
    {
      unique: true,
      partialFilterExpression: <mongoose.FilterQuery<SampleSchema>>{
        isDeleted: false,
      },
    },
  )

  console.log({ indexName })

  await Promise.all([sourceDB.close()])
  process.exit(0)
}

main()
