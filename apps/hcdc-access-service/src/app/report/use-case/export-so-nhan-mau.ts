import { ModuleRef } from '@nestjs/core'
import { Inject, Injectable } from '@nestjs/common'
import { AuthSubject, ReportAction, ReportType } from '@diut/hcdc'

import { AuthContextToken, IAuthContext, assertPermission } from 'src/domain'
import { ReportExportContext } from '../export-strategy/context'
import {
  ReportExportSoNhanMauStrategy,
  ReportExportSoNhanMauStrategyInput,
} from '../export-strategy/so-nhan-mau'

@Injectable()
export class ReportExportSoNhanMauUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    private readonly reportExportContext: ReportExportContext,
    private readonly moduleRef: ModuleRef,
  ) {}

  async execute(input: ReportExportSoNhanMauStrategyInput) {
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Report, ReportAction.Export, {
      type: ReportType.SoNhanMau,
    })

    const strategy = await this.moduleRef.resolve(ReportExportSoNhanMauStrategy)
    strategy.setOptions(input)
    this.reportExportContext.setStrategy(strategy)

    return this.reportExportContext.execute()
  }
}
