import { SchemaFactory } from '@nestjs/mongoose'
import { Connection } from 'mongoose'
import { COLLECTION } from 'src/infra/mongo'
import { TestCategorySchema } from 'src/infra/mongo/test-category'
import { branchId } from './branch'

export async function migrateTestCategory(
  sourceDB: Connection,
  destDB: Connection,
) {
  const schema = SchemaFactory.createForClass(TestCategorySchema)
  const destModel = destDB.model(COLLECTION.TEST_CATEGORY, schema)
  await destModel.deleteMany({ branchId }).exec()

  let counter = 0
  const cursor = sourceDB.collection('test_categories').find()
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
      reportIndex: oldDoc.reportIndex,
    })

    idMap.set(oldDoc._id.toString(), _id.toString())
  }

  console.log(`Completed ${counter} test_categories`)
  return idMap
}
