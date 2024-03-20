import { SchemaFactory } from '@nestjs/mongoose'
import { Connection } from 'mongoose'

import { COLLECTION } from 'src/infra'
import { DiagnosisSchema } from 'src/infra/mongo/diagnosis'

export async function migrateDiagnosis(
  sourceDB: Connection,
  destDB: Connection,
) {
  const schema = SchemaFactory.createForClass(DiagnosisSchema)
  const destModel = destDB.model(COLLECTION.DIAGNOSIS, schema)
  await destModel.deleteMany().exec()

  let counter = 0
  const cursor = sourceDB.collection('indications').find()
  for await (const oldDoc of cursor) {
    counter++

    await destModel.create({
      _id: oldDoc._id,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),

      branchId: '65b0b259a3a552cf47f563d9',

      displayIndex: oldDoc.index,
      name: (oldDoc.name as string).trim(),
    })
  }

  console.log(`Completed ${counter} indications`)
}
