import { ModuleRef } from '@nestjs/core'
import { Inject, Injectable } from '@nestjs/common'
import { AuthSubject, ReportAction, ReportType } from '@diut/hcdc'

import { AUTH_CONTEXT_TOKEN, IAuthContext, assertPermission } from 'src/domain'
import { ReportExportContext } from '../export-strategy/context'
import {
  ReportExportSoNhanMauStrategy,
  ReportExportSoNhanMauStrategyInput,
} from '../export-strategy/so-nhan-mau'

@Injectable()
export class ReportExportSoNhanMauUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    private readonly moduleRef: ModuleRef,
  ) {}

  async execute(input: ReportExportSoNhanMauStrategyInput) {
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Report, ReportAction.Export, {
      type: ReportType.SoNhanMau,
      branchId: input.branchId,
    })

    const strategy = await this.moduleRef.resolve(ReportExportSoNhanMauStrategy)
    const context = await this.moduleRef.resolve(ReportExportContext)

    strategy.setOptions(input)
    context.setStrategy(strategy)

    return context.execute()
  }
}
