import { Module } from '@nestjs/common'

import { SampleModule } from '../samples/sample.module'
import { TestComboModule } from '../test-combos/test-combo.module'
import { TestElementModule } from '../test-elements/test-element.module'
import { TestModule } from '../tests/test.module'
import { UserModule } from '../users/user.module'
import { CTMService } from './exports/ctm.service'
import { HCGService } from './exports/hcg.service'
import { HIVService } from './exports/hiv.service'
import { PapsmearService } from './exports/papsmear.service'
import { SinhHoaService } from './exports/sinh-hoa.service'
import { SoiNhuomService } from './exports/soi-nhuom.service'
import { TDService } from './exports/td.service'
import { ThinprepService } from './exports/thinprep.service'
import { TraKQService } from './exports/tra-kq.service'
import { Urine10Service } from './exports/urine10.service'
import { ReportController } from './report.controller'
import { ReportService } from './report.service'

@Module({
  imports: [
    SampleModule,
    TestElementModule,
    TestModule,
    TestComboModule,
    UserModule,
  ],
  providers: [
    ReportService,
    SoiNhuomService,
    TraKQService,
    TDService,
    SinhHoaService,
    HCGService,
    Urine10Service,
    PapsmearService,
    ThinprepService,
    CTMService,
    HIVService,
  ],
  controllers: [ReportController],
  exports: [ReportService],
})
export class ReportModule {}
