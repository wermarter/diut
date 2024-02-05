import { Inject, Injectable } from '@nestjs/common'

import { ExampleServiceSayHiUsecase } from 'src/app/example-service'
import { ISamplePrintStrategy } from './common'
import {
  IPrintFormRepository,
  PrintForm,
  PrintFormRepositoryToken,
} from 'src/domain'

// TODO: move to @diut/chrome-service
export type PrintMetadata = {
  authorTitle: string
  authorName: string
  titleMargin: number
}

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
    private readonly exampleServiceSayHiUsecase: ExampleServiceSayHiUsecase,
  ) {}

  setStrategy(printStrategy: ISamplePrintStrategy) {
    this.printStrategy = printStrategy
    return this
  }

  async execute(options: SamplePrintOptions) {
    const printForm = (await this.printFormRepository.findById(
      options.printFormId,
    ))!

    const meta: PrintMetadata = {
      authorName: options.overrideAuthor?.authorName ?? printForm.authorName,
      authorTitle: options.overrideAuthor?.authorTitle ?? printForm.authorTitle,
      titleMargin: options.overrideTitleMargin ?? printForm.titleMargin,
    }

    const data = await this.printStrategy.preparePrintData(options.sampleId)

    const result = await this.exampleServiceSayHiUsecase.execute({
      myNameIs: JSON.stringify({ meta, data }, null, 2),
    })

    return result
  }
}
