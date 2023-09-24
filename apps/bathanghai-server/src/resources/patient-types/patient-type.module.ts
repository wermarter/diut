import { Module } from '@nestjs/common'
import { MongoModule } from '@diut/server-core'

import { PatientTypeController } from './patient-type.controller'
import { PatientType } from './patient-type.schema'
import { PatientTypeService } from './patient-type.service'

@Module({
  imports: [MongoModule.forFeature(PatientType)],
  providers: [PatientTypeService],
  controllers: [PatientTypeController],
  exports: [PatientTypeService],
})
export class PatientTypeModule {}
