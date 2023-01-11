import { Module } from '@nestjs/common'

import { SampleModule } from '../samples/sample.module'
import { TestElementModule } from '../test-elements/test-element.module'
import { ReportController } from './report.controller'
import { ReportService } from './report.service'

@Module({
  imports: [SampleModule, TestElementModule],
  providers: [ReportService],
  controllers: [ReportController],
  exports: [ReportService],
})
export class ReportModule {}
