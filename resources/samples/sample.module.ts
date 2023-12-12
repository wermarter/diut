import { forwardRef, Module } from '@nestjs/common'
import { ConfigModule, MongoModule } from '@diut/nest-core'

import { DoctorModule } from '../doctors/doctor.module'
import { IndicationModule } from '../indications/indication.module'
import { PatientTypeModule } from '../patient-types/patient-type.module'
import { PatientModule } from '../patients/patient.module'
import { PrintFormModule } from '../print-forms/print-form.module'
import { SampleTypeModule } from '../sample-types/sample-type.module'
import { TestElementModule } from '../test-elements/test-element.module'
import { TestModule } from '../tests/test.module'
import { SampleController } from './sample.controller'
import { Sample } from './sample.schema'
import { SampleService } from './sample.service'
import { loadMinioConfig, loadAppConfig } from 'src/configs'

@Module({
  imports: [
    ConfigModule.forFeature(loadAppConfig),
    ConfigModule.forFeature(loadMinioConfig),
    MongoModule.forFeature(Sample),
    DoctorModule,
    IndicationModule,
    forwardRef(() => PatientModule),
    PatientTypeModule,
    SampleTypeModule,
    TestElementModule,
    TestModule,
    PrintFormModule,
  ],
  providers: [SampleService],
  controllers: [SampleController],
  exports: [SampleService],
})
export class SampleModule {}
