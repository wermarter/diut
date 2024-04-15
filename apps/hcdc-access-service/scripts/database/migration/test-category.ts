import { SchemaFactory } from '@nestjs/mongoose'
import { Connection } from 'mongoose'

import { COLLECTION } from 'src/infra'
import { TestCategorySchema } from 'src/infra/mongo/test-category'
import { branchId } from './branch'

export async function migrateTestCategory(
  sourceDB: Connection,
  destDB: Connection,
) {
  const schema = SchemaFactory.createForClass(TestCategorySchema)
  const destModel = destDB.model(COLLECTION.TEST_CATEGORY, schema)
  await destModel.deleteMany().exec()

  let counter = 0
  const cursor = sourceDB.collection('test_categories').find()
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
      reportIndex: oldDoc.reportIndex,
    })
  }

  console.log(`Completed ${counter} test_categories`)
}
