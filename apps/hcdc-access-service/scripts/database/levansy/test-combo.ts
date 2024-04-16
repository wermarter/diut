import { SchemaFactory } from '@nestjs/mongoose'
import { Connection } from 'mongoose'

import { COLLECTION } from 'src/infra'
import { TestComboSchema } from 'src/infra/mongo/test-combo'
import { branchId } from './branch'

export async function migrateTestCombo(
  sourceDB: Connection,
  destDB: Connection,
  testIdMap: Map<string, string>,
) {
  const schema = SchemaFactory.createForClass(TestComboSchema)
  const destModel = destDB.model(COLLECTION.TEST_COMBO, schema)
  await destModel.deleteMany({ branchId }).exec()

  let counter = 0
  const cursor = sourceDB.collection('test_combos').find()
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
      testIds: oldDoc.children.map((id) => testIdMap.get(id.toString())),
    })

    idMap.set(oldDoc._id.toString(), _id.toString())
  }

  console.log(`Completed ${counter} test_combos`)
  return idMap
}
