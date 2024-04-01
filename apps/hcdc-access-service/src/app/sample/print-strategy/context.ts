import { Inject, Injectable, Scope } from '@nestjs/common'
import { PrintForm } from '@diut/hcdc'

import { ISamplePrintStrategy } from './common'
import {
  IPrintFormRepository,
  ISampleTypeRepository,
  PrintFormRepositoryToken,
  SampleTypeRepositoryToken,
} from 'src/domain'
import { BranchAssertExistsUseCase } from 'src/app/branch'

export type SamplePrintOptions = {
  sampleId: string
  printFormId: string
  testIds: string[]
  sampleTypeIds: string[]
  overrideAuthor?: Pick<PrintForm, 'authorName' | 'authorTitle'>
  overrideTitleMargin?: Pick<PrintForm, 'titleMargin'>['titleMargin']
}

@Injectable({ scope: Scope.TRANSIENT })
export class SamplePrintContext {
  private printStrategy: ISamplePrintStrategy

  constructor(
    @Inject(PrintFormRepositoryToken)
    private readonly printFormRepository: IPrintFormRepository,
    @Inject(SampleTypeRepositoryToken)
    private readonly sampleTypeRepository: ISampleTypeRepository,
    private readonly branchAssertExistsUseCase: BranchAssertExistsUseCase,
  ) {}

  setStrategy(printStrategy: ISamplePrintStrategy) {
    this.printStrategy = printStrategy
    return this
  }

  async execute(options: SamplePrintOptions) {
    const printForm = (await this.printFormRepository.findById(
      options.printFormId,
    ))!

    const sampleTypeNames: string[] = []
    for (const sampleTypeId of options.sampleTypeIds) {
      const sampleType = await this.sampleTypeRepository.findById(sampleTypeId)
      sampleTypeNames.push(sampleType?.name!)
    }

    const branch = await this.branchAssertExistsUseCase.execute({
      _id: printForm.branchId,
    })

    const meta = {
      branch,
      sampleTypeNames,
      authorName: options.overrideAuthor?.authorName ?? printForm.authorName,
      authorTitle: options.overrideAuthor?.authorTitle ?? printForm.authorTitle,
      titleMargin: options.overrideTitleMargin ?? printForm.titleMargin,
    }

    const data = await this.printStrategy.preparePrintData(
      options.sampleId,
      options.testIds,
    )

    return { data, meta }
  }
}
