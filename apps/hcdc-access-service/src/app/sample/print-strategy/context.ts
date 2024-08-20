import { Inject, Injectable, Scope } from '@nestjs/common'
import { PrintForm, User } from '@diut/hcdc'
import { template } from 'lodash'

import { ISamplePrintStrategy } from './common'
import {
  AUTH_CONTEXT_TOKEN,
  AuthType,
  IAuthContext,
  IPrintFormRepository,
  ISampleTypeRepository,
  PRINTFORM_REPO_TOKEN,
  SAMPLETYPE_REPO_TOKEN,
} from 'src/domain'
import { BranchAssertExistsUseCase } from 'src/app/branch'
import { UserAssertExistsUseCase } from 'src/app/user'

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
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    @Inject(PRINTFORM_REPO_TOKEN)
    private readonly printFormRepository: IPrintFormRepository,
    @Inject(SAMPLETYPE_REPO_TOKEN)
    private readonly sampleTypeRepository: ISampleTypeRepository,
    private readonly branchAssertExistsUseCase: BranchAssertExistsUseCase,
    private readonly userAssertExistsUseCase: UserAssertExistsUseCase,
  ) {}

  setStrategy(printStrategy: ISamplePrintStrategy) {
    this.printStrategy = printStrategy
    return this
  }

  async execute(options: SamplePrintOptions) {
    const authContext = this.authContext.getData()
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
    let user: User
    if (authContext.type === AuthType.Internal) {
      user = authContext.user
    } else {
      user = await this.userAssertExistsUseCase.execute({
        _id: authContext.authorizedByUserId,
      })
    }
    meta.authorName = compileAuthorName({ user })

    const data = await this.printStrategy.preparePrintData(
      options.sampleId,
      options.testIds,
    )

    return { data, meta }
  }
}
