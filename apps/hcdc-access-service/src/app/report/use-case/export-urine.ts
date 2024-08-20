import { ModuleRef } from '@nestjs/core'
import { Inject, Injectable } from '@nestjs/common'
import { AuthSubject, ReportAction, ReportType } from '@diut/hcdc'

import { AUTH_CONTEXT_TOKEN, IAuthContext, assertPermission } from 'src/domain'
import { ReportExportContext } from '../export-strategy/context'
import {
  ReportExportUrineStrategy,
  ReportExportUrineStrategyInput,
} from '../export-strategy/urine'

@Injectable()
export class ReportExportUrineUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    private readonly moduleRef: ModuleRef,
  ) {}

  async execute(input: ReportExportUrineStrategyInput) {
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Report, ReportAction.Export, {
      type: ReportType.Urine,
      branchId: input.branchId,
    })

    const strategy = await this.moduleRef.resolve(ReportExportUrineStrategy)
    const context = await this.moduleRef.resolve(ReportExportContext)

    strategy.setOptions(input)
    context.setStrategy(strategy)

    return context.execute()
  }
}
