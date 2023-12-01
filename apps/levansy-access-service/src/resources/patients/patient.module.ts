import { forwardRef, Module } from '@nestjs/common'

import { MongoModule } from '@diut/nest-core'
import { SampleModule } from '../samples/sample.module'
import { PatientController } from './patient.controller'
import { Patient } from './patient.schema'
import { PatientService } from './patient.service'

@Module({
  imports: [MongoModule.forFeature(Patient), forwardRef(() => SampleModule)],
  providers: [PatientService],
  controllers: [PatientController],
  exports: [PatientService],
})
export class PatientModule {}
