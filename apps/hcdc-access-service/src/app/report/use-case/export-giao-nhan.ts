import { ModuleRef } from '@nestjs/core'
import { Inject, Injectable } from '@nestjs/common'
import { AuthSubject, ReportAction, ReportType } from '@diut/hcdc'

import { AUTH_CONTEXT_TOKEN, IAuthContext } from 'src/domain'
import { assertPermission } from 'src/app/auth/common'
import { ReportExportContext } from '../export-strategy/context'
import {
  ReportExportGiaoNhanStrategy,
  ReportExportGiaoNhanStrategyInput,
} from '../export-strategy/giao-nhan'

@Injectable()
export class ReportExportGiaoNhanUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    private readonly moduleRef: ModuleRef,
  ) {}

  async execute(input: ReportExportGiaoNhanStrategyInput) {
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Report, ReportAction.Export, {
      type: ReportType.GiaoNhan,
      branchId: input.branchId,
    })

    const strategy = await this.moduleRef.resolve(ReportExportGiaoNhanStrategy)
    const context = await this.moduleRef.resolve(ReportExportContext)

    strategy.setOptions(input)
    context.setStrategy(strategy)

    return context.execute()
  }
}
