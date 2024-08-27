import { Inject, Injectable } from '@nestjs/common'

import { SampleAssertExistsUseCase } from './assert-exists'
import {
  EEntityNotFound,
  IStorageBucket,
  IStorageService,
  StorageBucket,
  STORAGE_BUCKET_TOKEN,
  STORAGE_SERVICE_TOKEN,
} from 'src/domain'
import { TestElementAssertExistsUseCase } from 'src/app/test-element/use-case/assert-exists'

@Injectable()
export class SampleDownloadResultImageUseCase {
  constructor(
    private readonly sampleAssertExistsUseCase: SampleAssertExistsUseCase,
    private readonly testElementAssertExistsUseCase: TestElementAssertExistsUseCase,
    @Inject(STORAGE_SERVICE_TOKEN)
    private readonly storageService: IStorageService,
    @Inject(STORAGE_BUCKET_TOKEN)
    private readonly storageBucket: IStorageBucket,
  ) {}

  async execute(input: { sampleId: string; testElementId: string }) {
    const sample = await this.sampleAssertExistsUseCase.execute({
      _id: input.sampleId,
    })
    const testElement = await this.testElementAssertExistsUseCase.execute({
      _id: input.testElementId,
    })
    const testResult = sample.results.find(
      ({ testId }) => testId === testElement.testId,
    )
    if (!testResult) {
      throw new EEntityNotFound('test do not exist in result')
    }
    const elementResult = testResult.elements.find(
      ({ testElementId }) => testElementId === input.testElementId,
    )!

    try {
      const rv = await this.storageService.readToStream({
        bucket: this.storageBucket.get(StorageBucket.SAMPLE_IMAGES),
        key: elementResult.value,
      })

      return rv
    } catch (e) {
      if (e?.Code === 'NoSuchKey') {
        throw new EEntityNotFound('image not found')
      }
      throw e
    }
  }
}
