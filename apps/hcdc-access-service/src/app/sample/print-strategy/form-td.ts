import { Inject, Injectable } from '@nestjs/common'
import { PrintTemplate } from '@diut/hcdc'

import { AbstractSamplePrintStrategy } from './common'
import {
  ISampleRepository,
  ITestCategoryRepository,
  SAMPLE_REPO_TOKEN,
  TESTCATEGORY_REPO_TOKEN,
} from 'src/domain'

@Injectable()
export class SamplePrintFormTDStrategy extends AbstractSamplePrintStrategy {
  constructor(
    @Inject(SAMPLE_REPO_TOKEN)
    sampleRepository: ISampleRepository,
    @Inject(TESTCATEGORY_REPO_TOKEN)
    testCategoryRepository: ITestCategoryRepository,
  ) {
    super(sampleRepository, testCategoryRepository, PrintTemplate.FormTD)
  }
}
