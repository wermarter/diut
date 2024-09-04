import { SchemaFactory } from '@nestjs/mongoose'
import { Connection } from 'mongoose'

import { COLLECTION } from 'src/infra/mongo'
import { PatientTypeSchema } from 'src/infra/mongo/patient-type'
import { branchId } from './branch'

export async function migratePatientType(
  sourceDB: Connection,
  destDB: Connection,
) {
  const schema = SchemaFactory.createForClass(PatientTypeSchema)
  const destModel = destDB.model(COLLECTION.PATIENT_TYPE, schema)
  await destModel.deleteMany({ branchId }).exec()

  let counter = 0
  const cursor = sourceDB.collection('patient_types').find()
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

  console.log(`Completed ${counter} patient_types`)
}
