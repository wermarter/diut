import { Module } from '@nestjs/common'

import { SampleModule } from '../samples/sample.module'
import { TestElementModule } from '../test-elements/test-element.module'
import { SoiNhuomService } from './exports/soi-nhuom.service'
import { ReportController } from './report.controller'
import { ReportService } from './report.service'

@Module({
  imports: [SampleModule, TestElementModule],
  providers: [ReportService, SoiNhuomService],
  controllers: [ReportController],
  exports: [ReportService],
})
export class ReportModule {}
