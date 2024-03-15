import { Inject, Injectable } from '@nestjs/common'
import { PrintForm } from '@diut/hcdc'

import { ISamplePrintStrategy } from './common'
import { IPrintFormRepository, PrintFormRepositoryToken } from 'src/domain'

export type SamplePrintOptions = {
  sampleId: string
  printFormId: string
  overrideAuthor?: Pick<PrintForm, 'authorName' | 'authorTitle'>
  overrideTitleMargin?: Pick<PrintForm, 'titleMargin'>['titleMargin']
}

@Injectable()
export class SamplePrintContext {
  private printStrategy: ISamplePrintStrategy

  constructor(
    @Inject(PrintFormRepositoryToken)
    private readonly printFormRepository: IPrintFormRepository,
  ) {}

  setStrategy(printStrategy: ISamplePrintStrategy) {
    this.printStrategy = printStrategy
    return this
  }

  async execute(options: SamplePrintOptions) {
    const printForm = (await this.printFormRepository.findById(
      options.printFormId,
    ))!

    const meta = {
      authorName: options.overrideAuthor?.authorName ?? printForm.authorName,
      authorTitle: options.overrideAuthor?.authorTitle ?? printForm.authorTitle,
      titleMargin: options.overrideTitleMargin ?? printForm.titleMargin,
    }

    const data = await this.printStrategy.preparePrintData(options.sampleId)

    return { data, meta }
  }
}
