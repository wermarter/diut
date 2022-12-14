import { forwardRef, Module } from '@nestjs/common'

import { importCollection } from 'src/clients/mongo'
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

@Module({
  imports: [
    importCollection(Sample),
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
