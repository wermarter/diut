import { Inject, Injectable } from '@nestjs/common'

import { AbstractSamplePrintStrategy } from './common'
import {
  ISampleRepository,
  ITestCategoryRepository,
  PrintTemplate,
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
