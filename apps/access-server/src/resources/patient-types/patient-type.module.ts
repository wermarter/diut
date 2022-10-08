import { Module } from '@nestjs/common'

import { importCollection } from 'src/clients/mongo'
import { PatientTypeController } from './patient-type.controller'
import { PatientType } from './patient-type.schema'
import { PatientTypeService } from './patient-type.service'

@Module({
  imports: [importCollection(PatientType)],
  providers: [PatientTypeService],
  controllers: [PatientTypeController],
  exports: [PatientTypeService],
})
export class PatientTypeModule {}
