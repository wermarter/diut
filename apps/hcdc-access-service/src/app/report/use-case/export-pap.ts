import { AuthSubject, ReportAction, ReportType } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
import { assertPermission } from 'src/app/auth/common'
import { AUTH_CONTEXT_TOKEN, IAuthContext } from 'src/domain'
import { ReportExportContext } from '../export-strategy/context'
import {
  ReportExportPapStrategy,
  ReportExportPapStrategyInput,
} from '../export-strategy/pap'

@Injectable()
export class ReportExportPapUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    private readonly moduleRef: ModuleRef,
  ) {}

  async execute(input: ReportExportPapStrategyInput) {
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Report, ReportAction.Export, {
      type: ReportType.Pap,
      branchId: input.branchId,
    })

    const strategy = await this.moduleRef.resolve(ReportExportPapStrategy)
    const context = await this.moduleRef.resolve(ReportExportContext)

    strategy.setOptions(input)
    context.setStrategy(strategy)

    return context.execute()
  }
}
