import { ModuleRef } from '@nestjs/core'
import { Inject, Injectable } from '@nestjs/common'
import { AuthSubject, ReportAction, ReportType } from '@diut/hcdc'

import { AUTH_CONTEXT_TOKEN, IAuthContext } from 'src/domain'
import { assertPermission } from 'src/app/auth/common'
import { ReportExportContext } from '../export-strategy/context'
import {
  ReportExportThinprepStrategy,
  ReportExportThinprepStrategyInput,
} from '../export-strategy/thinprep'

@Injectable()
export class ReportExportThinprepUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    private readonly moduleRef: ModuleRef,
  ) {}

  async execute(input: ReportExportThinprepStrategyInput) {
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Report, ReportAction.Export, {
      type: ReportType.Thinprep,
      branchId: input.branchId,
    })

    const strategy = await this.moduleRef.resolve(ReportExportThinprepStrategy)
    const context = await this.moduleRef.resolve(ReportExportContext)

    strategy.setOptions(input)
    context.setStrategy(strategy)

    return context.execute()
  }
}
