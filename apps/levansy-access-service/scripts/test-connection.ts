#!/usr/bin/env -S pnpm exec ts-node -r tsconfig-paths/register
import * as mongoose from 'mongoose'
;(async function testConnection() {
  await mongoose
    .createConnection(
      'mongodb://root:password@localhost:27017/?retryWrites=true&authSource=admin&authMechanism=SCRAM-SHA-256&directConnection=true',
    )
    .asPromise()
  console.log('Connected to MongoDB')
})()
