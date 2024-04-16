import { SchemaFactory } from '@nestjs/mongoose'
import { Connection } from 'mongoose'

import { COLLECTION } from 'src/infra'
import { UserSchema } from 'src/infra/mongo/user'
import { branchId } from './branch'

export async function migrateUser(sourceDB: Connection, destDB: Connection) {
  const schema = SchemaFactory.createForClass(UserSchema)
  const destModel = destDB.model(COLLECTION.USER, schema)
  await destModel.deleteMany({ branchId }).exec()

  let counter = 0
  const cursor = sourceDB.collection('users').find()
  for await (const oldDoc of cursor) {
    counter++

    await destModel.create({
      _id: oldDoc._id,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),

      username: oldDoc.username,
      passwordHash: oldDoc.password,
      name: (oldDoc.name as string).trim(),
      phoneNumber: (oldDoc.phoneNumber as string)?.trim() ?? '1234567890',

      inlinePermissions: [],
      branchIds: [branchId],
      roleIds: [],
    })
  }

  console.log(`Completed ${counter} users`)
}
