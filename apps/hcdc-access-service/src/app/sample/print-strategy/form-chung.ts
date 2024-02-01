import { Inject, Injectable } from '@nestjs/common'

import { AbstractSamplePrintStrategy, ISamplePrintStrategy } from './common'
import {
  ISampleRepository,
  PrintTemplate,
  SampleRepositoryToken,
} from 'src/domain'

type PrintDataFormChung = {}

@Injectable()
export class SamplePrintFormChungStrategy
  extends AbstractSamplePrintStrategy
  implements ISamplePrintStrategy
{
  constructor(
    @Inject(SampleRepositoryToken)
    sampleRepository: ISampleRepository,
  ) {
    super(sampleRepository, PrintTemplate.FormChung)
  }

  getPrintConfig(): unknown {
    return {}
  }
}
