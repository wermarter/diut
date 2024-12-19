import { SchemaFactory } from '@nestjs/mongoose'
import { Connection } from 'mongoose'
import { COLLECTION } from 'src/infra/mongo'
import { DoctorSchema } from 'src/infra/mongo/doctor'
import { branchId } from './branch'

export async function migrateDoctor(sourceDB: Connection, destDB: Connection) {
  const schema = SchemaFactory.createForClass(DoctorSchema)
  const destModel = destDB.model(COLLECTION.DOCTOR, schema)
  await destModel.deleteMany({ branchId }).exec()

  let counter = 0
  const cursor = sourceDB.collection('doctors').find()
  const idMap = new Map<string, string>()

  for await (const oldDoc of cursor) {
    counter++

    const { _id } = await destModel.create({
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),

      branchId,

      displayIndex: oldDoc.index,
      name: (oldDoc.name as string).trim(),
    })

    idMap.set(oldDoc._id.toString(), _id.toString())
  }

  console.log(`Completed ${counter} doctors`)
  return idMap
}
