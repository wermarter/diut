import { ModuleRef } from '@nestjs/core'
import { Inject, Injectable } from '@nestjs/common'
import { AuthSubject, ReportAction, ReportType } from '@diut/hcdc'

import { AUTH_CONTEXT_TOKEN, IAuthContext } from 'src/domain'
import { assertPermission } from 'src/app/auth/common'
import { ReportExportContext } from '../export-strategy/context'
import {
  ReportExportSoiNhuomStrategy,
  ReportExportSoiNhuomStrategyInput,
} from '../export-strategy/soi-nhuom'

@Injectable()
export class ReportExportSoiNhuomUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    private readonly moduleRef: ModuleRef,
  ) {}

  async execute(input: ReportExportSoiNhuomStrategyInput) {
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Report, ReportAction.Export, {
      type: ReportType.SoiNhuom,
      branchId: input.branchId,
    })

    const strategy = await this.moduleRef.resolve(ReportExportSoiNhuomStrategy)
    const context = await this.moduleRef.resolve(ReportExportContext)

    strategy.setOptions(input)
    context.setStrategy(strategy)

    return context.execute()
  }
}
