#!/usr/bin/env -S pnpm exec ts-node -r tsconfig-paths/register
import { SchemaFactory } from '@nestjs/mongoose'
import * as dotenv from 'dotenv'
import * as mongoose from 'mongoose'
import { COLLECTION } from 'src/infra/mongo'
import { UserSchema } from 'src/infra/mongo/user'
dotenv.config()

mongoose.set('debug', true)

async function main() {
  const [destDB] = await Promise.all([
    mongoose.createConnection(process.env.DEST_MONGO_URI!).asPromise(),
  ])
  console.log('DB connected')

  const schema = SchemaFactory.createForClass(UserSchema)
  const model = destDB.model(COLLECTION.USER, schema)

  await model.collection.createIndex(
    { username: 1 },
    {
      unique: true,
      partialFilterExpression: <mongoose.FilterQuery<UserSchema>>{
        isDeleted: false,
      },
    },
  )

  await Promise.all([destDB.close()])
  process.exit(0)
}

main()
