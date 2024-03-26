import { Inject, Injectable } from '@nestjs/common'

import { AuthContextToken, IAuthContext } from 'src/domain'
import { ReportQuerySoNhanMauUseCase } from './query-so-nhan-mau'

@Injectable()
export class ReportExportSoNhanMauUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    private readonly reportQuerySoNhanMauUseCase: ReportQuerySoNhanMauUseCase,
  ) {}

  async execute(input: {
    fromDate: Date
    toDate: Date
    branchId: string
    isNgoaiGio?: boolean
    patientTypeId?: string
    originId?: string
  }) {
    const { items: samples, summary } =
      await this.reportQuerySoNhanMauUseCase.execute(input)

    return { samples, summary }
  }
}
