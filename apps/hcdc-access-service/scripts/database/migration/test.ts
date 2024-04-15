import { SchemaFactory } from '@nestjs/mongoose'
import { Connection } from 'mongoose'

import { COLLECTION } from 'src/infra'
import { TestSchema } from 'src/infra/mongo/test'
import { branchId } from './branch'

export async function migrateTest(sourceDB: Connection, destDB: Connection) {
  const schema = SchemaFactory.createForClass(TestSchema)
  const destModel = destDB.model(COLLECTION.TEST, schema)
  await destModel.deleteMany().exec()

  let counter = 0
  const cursor = sourceDB.collection('tests').find()
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
      shouldDisplayWithChildren: true,
      bioProductId: null,
      instrumentId: null,
      sampleTypeId: null,
      testCategoryId: oldDoc.category,
      printFormId: oldDoc.shouldNotPrint ? null : oldDoc.printForm,
    })
  }

  console.log(`Completed ${counter} tests`)
}
