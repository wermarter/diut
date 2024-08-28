import { AuthSubject, ReportAction, ReportType } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'

import { assertPermission } from 'src/app/auth/common'
import { AUTH_CONTEXT_TOKEN, IAuthContext } from 'src/domain'
import { ReportExportContext } from '../export-strategy/context'
import {
  ReportExportHIVStrategy,
  ReportExportHIVStrategyInput,
} from '../export-strategy/hiv'

@Injectable()
export class ReportExportHIVUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    private readonly moduleRef: ModuleRef,
  ) {}

  async execute(input: ReportExportHIVStrategyInput) {
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Report, ReportAction.Export, {
      type: ReportType.HIV,
      branchId: input.branchId,
    })

    const strategy = await this.moduleRef.resolve(ReportExportHIVStrategy)
    const context = await this.moduleRef.resolve(ReportExportContext)

    strategy.setOptions(input)
    context.setStrategy(strategy)

    return context.execute()
  }
}
