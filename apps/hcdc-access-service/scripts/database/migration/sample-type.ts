import { SchemaFactory } from '@nestjs/mongoose'
import { Connection } from 'mongoose'

import { COLLECTION } from 'src/infra'
import { SampleTypeSchema } from 'src/infra/mongo/sample-type'

export async function migrateSampleType(
  sourceDB: Connection,
  destDB: Connection,
) {
  const schema = SchemaFactory.createForClass(SampleTypeSchema)
  const destModel = destDB.model(COLLECTION.SAMPLE_TYPE, schema)
  await destModel.deleteMany().exec()

  let counter = 0
  const cursor = sourceDB.collection('sample_types').find()
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

  console.log(`Completed ${counter} sample_types`)
}