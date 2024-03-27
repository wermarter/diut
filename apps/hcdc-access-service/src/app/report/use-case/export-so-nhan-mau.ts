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
    private readonly reportExportSoNhanMauStrategy: ReportExportSoNhanMauStrategy,
  ) {}

  execute(input: ReportExportSoNhanMauStrategyInput) {
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Report, ReportAction.Export, {
      type: ReportType.SoNhanMau,
    })

    this.reportExportSoNhanMauStrategy.setOptions(input)
    this.reportExportContext.setStrategy(this.reportExportSoNhanMauStrategy)

    return this.reportExportContext.execute()
  }
}
