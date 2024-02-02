import { Inject, Injectable } from '@nestjs/common'

import { ExampleServiceSayHiUsecase } from 'src/app/example-service'
import { ISamplePrintStrategy } from './common'
import {
  AuthContextToken,
  AuthSubject,
  IAuthContext,
  PrintForm,
  PrintFormAction,
  SampleAction,
  assertPermission,
} from 'src/domain'
import { SampleAssertExistsUseCase } from '../use-case/assert-exists'
import { PrintFormAssertExistsUseCase } from 'src/app/print-form'

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
    private readonly exampleServiceSayHiUsecase: ExampleServiceSayHiUsecase,
  ) {}

  setStrategy(printStrategy: ISamplePrintStrategy) {
    this.printStrategy = printStrategy
    return this
  }

  async execute(options: SamplePrintOptions) {
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
