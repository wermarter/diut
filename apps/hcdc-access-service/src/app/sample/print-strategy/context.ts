import { Inject, Injectable, Scope } from '@nestjs/common'
import { PrintForm } from '@diut/hcdc'
import { template } from 'lodash'

import { ISamplePrintStrategy } from './common'
import {
  AuthContextToken,
  IAuthContext,
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
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
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
    const { user } = this.authContext.getData()
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

    const compileAuthorName = template(meta.authorName)
    meta.authorName = compileAuthorName({ user })

    const data = await this.printStrategy.preparePrintData(
      options.sampleId,
      options.testIds,
    )

    return { data, meta }
  }
}
