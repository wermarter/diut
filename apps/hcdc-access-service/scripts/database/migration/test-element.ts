import { PatientCategory } from '@diut/hcdc'
import { SchemaFactory } from '@nestjs/mongoose'
import { Connection } from 'mongoose'

import { COLLECTION } from 'src/infra'
import { TestElementSchema } from 'src/infra/mongo/test-element'
import { branchId } from './branch'

export async function migrateTestElement(
  sourceDB: Connection,
  destDB: Connection,
) {
  const schema = SchemaFactory.createForClass(TestElementSchema)
  const destModel = destDB.model(COLLECTION.TEST_ELEMENT, schema)
  await destModel.deleteMany().exec()

  const patientCategoryMapping = {
    any: PatientCategory.Any,
    boy: PatientCategory.YoungMale,
    girl: PatientCategory.YoungFemale,
    man: PatientCategory.MatureMale,
    woman: PatientCategory.MatureFemale,
    pregnant: PatientCategory.Pregnant,
  }

  let counter = 0
  const cursor = sourceDB.collection('test_elements').find()
  for await (const oldDoc of cursor) {
    counter++

    await destModel.create({
      _id: oldDoc._id,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),

      branchId,

      name: (oldDoc.name as string).trim(),
      displayIndex: oldDoc.index,
      reportIndex: oldDoc.reportOrder,
      printIndex: oldDoc.printIndex,
      unit: (oldDoc.unit ?? '').trim(),
      isParent: oldDoc.isParent,
      testId: oldDoc.test,
      normalRules: oldDoc.highlightRules.map((highlightRule) => ({
        category: patientCategoryMapping[highlightRule.category ?? 'any'],
        defaultChecked: highlightRule.defaultChecked ?? false,
        note: (highlightRule.note ?? '').trim(),
        description: (highlightRule.description ?? '').trim(),
        normalLowerBound: highlightRule.min ?? undefined,
        normalUpperBound: highlightRule.max ?? undefined,
        normalValue: highlightRule.normalValue?.trim?.() ?? undefined,
      })),
    })
  }

  console.log(`Completed ${counter} test_elements`)
}
