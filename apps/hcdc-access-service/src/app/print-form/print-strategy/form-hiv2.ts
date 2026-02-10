import { PrintTemplate } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'
import {
  ISampleRepository,
  ITestCategoryRepository,
  SAMPLE_REPO_TOKEN,
  TESTCATEGORY_REPO_TOKEN,
} from 'src/domain'
import { AbstractSamplePrintStrategy } from './common'

@Injectable()
export class SamplePrintFormHIV2Strategy extends AbstractSamplePrintStrategy {
  static readonly type = PrintTemplate.FormHIV2

  constructor(
    @Inject(SAMPLE_REPO_TOKEN)
    sampleRepository: ISampleRepository,
    @Inject(TESTCATEGORY_REPO_TOKEN)
    testCategoryRepository: ITestCategoryRepository,
  ) {
    super(sampleRepository, testCategoryRepository, PrintTemplate.FormHIV2)
  }
}
