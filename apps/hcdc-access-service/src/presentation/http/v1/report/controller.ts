import { Body } from '@nestjs/common'

import { reportRoutes } from './routes'
import { HttpController, HttpRoute } from '../../common'
import { ReportSoNhanMauUseCase } from 'src/app/report'
import { ReportQuerySoNhanMauRequestDto } from './dto/so-nhan-mau.dto'

@HttpController({
  basePath: 'v1/reports',
})
export class ReportController {
  constructor(
    private readonly reportSoNhanMauUseCase: ReportSoNhanMauUseCase,
  ) {}

  @HttpRoute(reportRoutes.querySoNhanMau)
  async querySoNhanMau(@Body() body: ReportQuerySoNhanMauRequestDto) {
    return this.reportSoNhanMauUseCase.execute(body)
  }
}
