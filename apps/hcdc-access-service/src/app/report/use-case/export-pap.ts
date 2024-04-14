import { ModuleRef } from '@nestjs/core'
import { Inject, Injectable } from '@nestjs/common'
import { AuthSubject, ReportAction, ReportType } from '@diut/hcdc'

import { AuthContextToken, IAuthContext, assertPermission } from 'src/domain'
import { ReportExportContext } from '../export-strategy/context'
import {
  ReportExportPapStrategy,
  ReportExportPapStrategyInput,
} from '../export-strategy/pap'

@Injectable()
export class ReportExportPapUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    private readonly moduleRef: ModuleRef,
  ) {}

  async execute(input: ReportExportPapStrategyInput) {
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Report, ReportAction.Export, {
      type: ReportType.Pap,
    })

    const strategy = await this.moduleRef.resolve(ReportExportPapStrategy)
    const context = await this.moduleRef.resolve(ReportExportContext)

    strategy.setOptions(input)
    context.setStrategy(strategy)

    return context.execute()
  }
}
