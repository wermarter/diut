import { Inject, Injectable } from '@nestjs/common'
import { PrintTemplate } from '@diut/hcdc'

import { AbstractSamplePrintStrategy, SamplePrintData } from './common'
import {
  ISampleRepository,
  IStorageBucket,
  IStorageService,
  ITestCategoryRepository,
  SampleRepositoryToken,
  StorageBucket,
  StorageBucketToken,
  StorageServiceToken,
  TestCategoryRepositoryToken,
} from 'src/domain'

@Injectable()
export class SamplePrintFormPapStrategy extends AbstractSamplePrintStrategy {
  constructor(
    @Inject(SampleRepositoryToken)
    sampleRepository: ISampleRepository,
    @Inject(TestCategoryRepositoryToken)
    testCategoryRepository: ITestCategoryRepository,
    @Inject(StorageBucketToken)
    private readonly storageBucket: IStorageBucket,
    @Inject(StorageServiceToken)
    private readonly storageService: IStorageService,
  ) {
    super(sampleRepository, testCategoryRepository, PrintTemplate.FormPap)
  }

  async preparePrintData(
    sampleId: string,
    testIds: string[],
  ): Promise<SamplePrintData> {
    const printData = await super.preparePrintData(sampleId, testIds)

    const leftImageKey = printData.categories[0].tests[0].elements[32].value
    const rightImageKey = printData.categories[0].tests[0].elements[33].value

    printData.categories[0].tests[0].elements[32].value =
      await this.makeBinaryImageSrc(leftImageKey)
    printData.categories[0].tests[0].elements[33].value =
      await this.makeBinaryImageSrc(rightImageKey)

    return printData
  }

  private async makeBinaryImageSrc(key: string) {
    const { buffer, mimeType } = await this.storageService.readToBuffer({
      key,
      bucket: this.storageBucket.get(StorageBucket.SAMPLE_IMAGES),
    })
    const base64Image = buffer.toString('base64')

    return `data:${mimeType ?? 'image/jpeg'};base64,${base64Image}`
  }
}
