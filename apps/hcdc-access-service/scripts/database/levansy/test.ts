import { SchemaFactory } from '@nestjs/mongoose'
import { Connection } from 'mongoose'
import { COLLECTION } from 'src/infra/mongo'
import { TestSchema } from 'src/infra/mongo/test'
import { branchId } from './branch'

export async function migrateTest(
  sourceDB: Connection,
  destDB: Connection,
  testCategoryIdMap: Map<string, string>,
) {
  const schema = SchemaFactory.createForClass(TestSchema)
  const destModel = destDB.model(COLLECTION.TEST, schema)
  await destModel.deleteMany({ branchId }).exec()

  let counter = 0
  const cursor = sourceDB.collection('tests').find()
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
      shouldDisplayWithChildren: oldDoc.shouldDisplayWithChildren ?? true,
      bioProductId: null,
      instrumentId: null,
      sampleTypeId: null,
      testCategoryId: testCategoryIdMap.get(oldDoc.category),
      printFormId: oldDoc.shouldNotPrint ? null : oldDoc.printForm,
    })

    idMap.set(oldDoc._id.toString(), _id.toString())
  }

  console.log(`Completed ${counter} tests`)
  return idMap
}
