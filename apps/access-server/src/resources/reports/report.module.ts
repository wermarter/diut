import { Module } from '@nestjs/common'

import { SampleModule } from '../samples/sample.module'
import { TestElementModule } from '../test-elements/test-element.module'
import { TestModule } from '../tests/test.module'
import { SoiNhuomService } from './exports/soi-nhuom.service'
import { TraKQService } from './exports/tra-kq.service'
import { ReportController } from './report.controller'
import { ReportService } from './report.service'

@Module({
  imports: [SampleModule, TestElementModule, TestModule],
  providers: [ReportService, SoiNhuomService, TraKQService],
  controllers: [ReportController],
  exports: [ReportService],
})
export class ReportModule {}
