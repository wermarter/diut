#!/usr/bin/env -S pnpm exec ts-node -r tsconfig-paths/register
import * as mongoose from 'mongoose'
;(async function testConnection() {
  await mongoose
    .createConnection('mongodb://primary.mongodb.diut.k8s.local:8081')
    .asPromise()
  console.log('Connected to MongoDB')
})()
