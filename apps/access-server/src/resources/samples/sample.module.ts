import { Module } from '@nestjs/common'

import { importCollection } from 'src/clients/mongo'
import { DoctorModule } from '../doctors'
import { IndicationModule } from '../indications'
import { PatientTypeModule } from '../patient-types'
import { PatientModule } from '../patients'
import { PrintFormModule } from '../print-forms'
import { SampleTypeModule } from '../sample-types'
import { TestElementModule } from '../test-elements'
import { TestModule } from '../tests'
import { SampleController } from './sample.controller'
import { Sample } from './sample.schema'
import { SampleService } from './sample.service'

@Module({
  imports: [
    importCollection(Sample),
    DoctorModule,
    IndicationModule,
    PatientModule,
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
