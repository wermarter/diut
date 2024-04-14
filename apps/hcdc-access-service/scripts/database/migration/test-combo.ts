import { SchemaFactory } from '@nestjs/mongoose'
import { Connection } from 'mongoose'

import { COLLECTION } from 'src/infra'
import { TestComboSchema } from 'src/infra/mongo/test-combo'

export async function migrateTestCombo(
  sourceDB: Connection,
  destDB: Connection,
) {
  const schema = SchemaFactory.createForClass(TestComboSchema)
  const destModel = destDB.model(COLLECTION.TEST_COMBO, schema)
  await destModel.deleteMany().exec()

  let counter = 0
  const cursor = sourceDB.collection('test_combos').find()
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
      testIds: oldDoc.children.map((id) => id.toString()),
    })
  }

  console.log(`Completed ${counter} test_combos`)
}
