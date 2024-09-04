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
  for await (const oldDoc of cursor) {
    counter++

    await destModel.create({
      _id: oldDoc._id,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),

      branchId,

      displayIndex: oldDoc.index,
      name: (oldDoc.name as string).trim(),
    })
  }

  console.log(`Completed ${counter} patient_types`)
}
