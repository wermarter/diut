import { SchemaFactory } from '@nestjs/mongoose'
import { Connection } from 'mongoose'
import { COLLECTION } from 'src/infra/mongo'
import { SampleSchema } from 'src/infra/mongo/sample'
import { branchId } from './branch'

export async function migrateSample(sourceDB: Connection, destDB: Connection) {
  const sampleSchema = SchemaFactory.createForClass(SampleSchema)
  const sampleModel = destDB.model(COLLECTION.SAMPLE, sampleSchema)
  // await sampleModel.deleteMany({ branchId }).exec()

  let counter = 0
  const cursor = sourceDB
    .collection('samples')
    .find({ results: { $elemMatch: { testId: '655ef16e9047175c1b18483d' } } })
  const patientIds = new Set<string>()

  for await (const oldDoc of cursor) {
    if (++counter % 100 === 0) {
      console.log(counter)
    }
    patientIds.add(oldDoc.patientId)
    const [result] = oldDoc.results

    await sampleModel.create({
      _id: oldDoc._id,
      isDeleted: false,
      createdAt: oldDoc.createdAt,
      updatedAt: oldDoc.updatedAt,
      branchId,

      sampleId: oldDoc.sampleId,
      sampledAt: oldDoc.sampledAt,
      infoAt: oldDoc.infoAt,
      infoById: oldDoc.infoBy?.toString(),
      note: oldDoc.note?.trim(),
      isNgoaiGio: oldDoc.isNgoaiGio ?? false,
      isTraBuuDien: oldDoc.isTraBuuDien ?? false,
      isConfirmed: oldDoc.infoCompleted ?? false,
      sampleCompleted: oldDoc.sampleCompleted ?? false,
      isPregnant: false,
      printedAt: oldDoc.printedAt,
      printedById: oldDoc.printedBy,
      patientId: oldDoc.patientId,
      doctorId: '661e922189866edff2c9f0ae',
      patientTypeId: '661e922189866edff2c9f0b2',
      diagnosisId: '661e921d89866edff2c9f090',
      originId: branchId,
      sampleTypeIds: ['661e922389866edff2c9f0ca'],
      results: {
        testId: '661e922c89866edff2c9f124',
        resultById: result.resultBy,
        resultAt: result.resultAt,
        isLocked: true,
        elements: [
          {
            testElementId: '661e923e89866edff2c9f1b8',
            value: result.elements[0]?.value,
            isAbnormal: result.elements[0]?.isHighlighted,
          },
        ],
      },
    })
  }

  console.log(`Completed ${counter} samples`)
  return Array.from(patientIds)
}
