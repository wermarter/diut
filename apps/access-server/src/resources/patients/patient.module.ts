import { Module } from '@nestjs/common'

import { importCollection } from 'src/clients/mongo'
import { PatientController } from './patient.controller'
import { Patient } from './patient.schema'
import { PatientService } from './patient.service'

@Module({
  imports: [importCollection(Patient)],
  providers: [PatientService],
  controllers: [PatientController],
  exports: [PatientService],
})
export class PatientModule {}
