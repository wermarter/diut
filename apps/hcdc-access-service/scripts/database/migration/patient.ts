import { dedupSpaces } from '@diut/common'
import { PatientGender } from '@diut/hcdc'
import { SchemaFactory } from '@nestjs/mongoose'
import { Connection } from 'mongoose'
import { COLLECTION } from 'src/infra/mongo'
import { PatientSchema } from 'src/infra/mongo/patient'
import { branchId } from './branch'

export async function migratePatient(sourceDB: Connection, destDB: Connection) {
  const schema = SchemaFactory.createForClass(PatientSchema)
  const destModel = destDB.model(COLLECTION.PATIENT, schema)
  await destModel.deleteMany({ branchId }).exec()

  let counter = 0
  const cursor = sourceDB.collection('patients').find()
  for await (const oldDoc of cursor) {
    if (++counter % 100 === 0) {
      console.log(counter)
    }

    await destModel.create({
      _id: oldDoc._id,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),

      branchId,

      externalId: oldDoc.externalId?.trim(),
      name: dedupSpaces(oldDoc.name),
      gender: oldDoc.gender === 1 ? PatientGender.Female : PatientGender.Male,
      birthYear: oldDoc.birthYear,
      address: oldDoc.address?.trim() ?? '',
      phoneNumber: oldDoc.phoneNumber?.trim() ?? '',
      SSN: oldDoc.SSN?.trim() ?? '',
    })
  }

  console.log(`Completed ${counter} patients`)
}
