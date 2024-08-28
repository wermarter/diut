#!/usr/bin/env -S pnpm exec ts-node -r tsconfig-paths/register
import * as dotenv from 'dotenv'
import * as mongoose from 'mongoose'
dotenv.config()

async function testConnection() {
  const sourceDB = await mongoose
    .createConnection(process.env.SOURCE_MONGO_URI!)
    .asPromise()
  console.log('Connected to SOURCE DB')
  const destDB = await mongoose
    .createConnection(process.env.DEST_MONGO_URI!)
    .asPromise()
  console.log('Connected to DEST DB')

  await Promise.all([sourceDB.close(), destDB.close()])
  process.exit(0)
}

testConnection()
