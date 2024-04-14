import { Inject, Injectable } from '@nestjs/common'
import { PrintTemplate } from '@diut/hcdc'

import { AbstractSamplePrintStrategy } from './common'
import {
  ISampleRepository,
  ITestCategoryRepository,
  SampleRepositoryToken,
  TestCategoryRepositoryToken,
} from 'src/domain'

@Injectable()
export class SamplePrintFormChungStrategy extends AbstractSamplePrintStrategy {
  constructor(
    @Inject(SampleRepositoryToken)
    sampleRepository: ISampleRepository,
    @Inject(TestCategoryRepositoryToken)
    testCategoryRepository: ITestCategoryRepository,
  ) {
    super(sampleRepository, testCategoryRepository, PrintTemplate.FormChung)
  }
}
