import { AuthSubject, ReportAction, ReportType } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'

import { assertPermission } from 'src/app/auth/common'
import { AUTH_CONTEXT_TOKEN, IAuthContext } from 'src/domain'
import { ReportExportContext } from '../export-strategy/context'
import {
  ReportExportTDDStrategy,
  ReportExportTDDStrategyInput,
} from '../export-strategy/tdd'

@Injectable()
export class ReportExportTDDUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    private readonly moduleRef: ModuleRef,
  ) {}

  async execute(input: ReportExportTDDStrategyInput) {
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Report, ReportAction.Export, {
      type: ReportType.TDD,
      branchId: input.branchId,
    })

    const strategy = await this.moduleRef.resolve(ReportExportTDDStrategy)
    const context = await this.moduleRef.resolve(ReportExportContext)

    strategy.setOptions(input)
    context.setStrategy(strategy)

    return context.execute()
  }
}
