import { PrintTemplate } from '@diut/hcdc'
import { SchemaFactory } from '@nestjs/mongoose'
import { Connection } from 'mongoose'

import { COLLECTION } from 'src/infra'
import { PrintFormSchema } from 'src/infra/mongo/print-form'

export async function migratePrintForm(
  sourceDB: Connection,
  destDB: Connection,
) {
  const schema = SchemaFactory.createForClass(PrintFormSchema)
  const destModel = destDB.model(COLLECTION.PRINT_FORM, schema)
  await destModel.deleteMany().exec()

  let counter = 0
  const cursor = sourceDB.collection('print_forms').find()
  for await (const oldDoc of cursor) {
    counter++

    await destModel.create({
      _id: oldDoc._id,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),

      branchId: '65b0b259a3a552cf47f563d9',

      displayIndex: oldDoc.index,
      name: oldDoc.name.trim(),
      isAuthorLocked: oldDoc.isAuthorLocked,
      isA4: oldDoc.isA4,
      authorTitle: oldDoc.authorPosition.trim(),
      authorName: oldDoc.authorName.trim(),
      titleMargin: 0,
      template: PrintTemplate.FormChung,
    })
  }

  console.log(`Completed ${counter} print_forms`)
}
