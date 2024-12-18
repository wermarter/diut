import { Inject, Injectable } from '@nestjs/common'
import { TestElementAssertExistsUseCase } from 'src/app/test-element/use-case/assert-exists'
import {
  EEntityNotFound,
  IStorageBucket,
  IStorageService,
  STORAGE_BUCKET_TOKEN,
  STORAGE_SERVICE_TOKEN,
  StorageBucket,
  StorageKeyFactory,
} from 'src/domain'
import { SampleAssertExistsUseCase } from './assert-exists'
import { SampleUpdateResultUseCase } from './update-result'

@Injectable()
export class SampleUploadResultImageUseCase {
  constructor(
    private readonly sampleAssertExistsUseCase: SampleAssertExistsUseCase,
    private readonly testElementAssertExistsUseCase: TestElementAssertExistsUseCase,
    private readonly sampleUpdateResultUseCase: SampleUpdateResultUseCase,
    @Inject(STORAGE_SERVICE_TOKEN)
    private readonly storageService: IStorageService,
    @Inject(STORAGE_BUCKET_TOKEN)
    private readonly storageBucket: IStorageBucket,
  ) {}

  async execute(input: {
    sampleId: string
    testElementId: string
    imageBuffer: Buffer
    mimeType: string
  }) {
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

    const storageKey = StorageKeyFactory[
      StorageBucket.SAMPLE_IMAGES
    ].resultImage({
      sampleId: input.sampleId,
      elementId: input.testElementId,
    })

    elementResult.value = storageKey

    await this.sampleUpdateResultUseCase.execute({
      filter: { _id: input.sampleId },
      data: {
        results: [{ ...testResult, elements: [elementResult] }],
      },
    })

    await this.storageService.upload({
      bucket: this.storageBucket.get(StorageBucket.SAMPLE_IMAGES),
      key: storageKey,
      buffer: input.imageBuffer,
      mimeType: input.mimeType,
    })

    return storageKey
  }
}
