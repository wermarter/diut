import { SchemaFactory } from '@nestjs/mongoose'
import { Connection } from 'mongoose'

import { COLLECTION } from 'src/infra'
import { branchId } from './branch'
import { StorageBucket, StorageKeyFactory } from 'src/domain'
import { SampleSchema } from 'src/infra/mongo/sample'

const PAP_IMAGE_ELEMENT_IDS = [
  '638493130ee21e62196b965c',
  '63873502dfb313b3b3113171',
  '6384932e0ee21e62196b979f',
  '63873536dfb313b3b3113479',
]
const ID_INDICATION_PREGNANT = '63533c653b685db3059d871e'

export async function migrateSample(sourceDB: Connection, destDB: Connection) {
  const sampleSchema = SchemaFactory.createForClass(SampleSchema)
  const sampleModel = destDB.model(COLLECTION.SAMPLE, sampleSchema)
  await sampleModel.deleteMany({ branchId }).exec()

  let counter = 0
  const cursor = sourceDB.collection('samples').find()
  for await (const oldDoc of cursor) {
    if (++counter % 100 === 0) {
      console.log(counter)
    }

    await sampleModel.create({
      _id: oldDoc._id,
      isDeleted: false,
      createdAt: oldDoc.createdAt,
      updatedAt: oldDoc.updatedAt,
      branchId,

      sampleId: oldDoc.sampleId,
      billId: '',
      sampledAt: oldDoc.sampledAt,
      infoAt: oldDoc.infoAt,
      infoById: oldDoc.infoBy?.toString(),
      note: oldDoc.note?.trim(),
      isNgoaiGio: oldDoc.isNgoaiGio ?? false,
      isTraBuuDien: oldDoc.isTraBuuDien ?? false,
      isConfirmed: oldDoc.infoCompleted ?? false,
      sampleCompleted: oldDoc.sampleCompleted ?? false,
      isPregnant: oldDoc.indicationId === ID_INDICATION_PREGNANT,
      printedAt: oldDoc.printedAt,
      printedById: oldDoc.printedBy,
      patientId: oldDoc.patientId,
      doctorId: oldDoc.doctorId,
      patientTypeId: oldDoc.patientTypeId,
      diagnosisId: oldDoc.indicationId,
      originId: branchId,
      sampleTypeIds: oldDoc.sampleTypeIds.map((id) => id?.toString()),
      results: oldDoc.results?.map(
        ({
          testId,
          bioProductName,
          resultBy,
          resultAt,
          testCompleted,
          elements,
        }) => ({
          testId,
          bioProductName,
          resultById: resultBy,
          resultAt,
          isLocked: testCompleted ?? false,
          elements: elements.map(({ id, value, isHighlighted }) => {
            if (PAP_IMAGE_ELEMENT_IDS.includes(id)) {
              return {
                testElementId: id,
                value: StorageKeyFactory[
                  StorageBucket.SAMPLE_IMAGES
                ].resultImage({
                  sampleId: oldDoc._id.toString(),
                  elementId: id,
                }),
                isAbnormal: false,
              }
            }

            return {
              testElementId: id,
              value: value?.trim(),
              isAbnormal: isHighlighted ?? false,
            }
          }),
        }),
      ),
    })
  }

  console.log(`Completed ${counter} samples`)
}
