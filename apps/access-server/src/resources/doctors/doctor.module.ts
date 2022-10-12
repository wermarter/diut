import { Module } from '@nestjs/common'

import { importCollection } from 'src/clients/mongo'
import { DoctorController } from './doctor.controller'
import { Doctor } from './doctor.schema'
import { DoctorService } from './doctor.service'

@Module({
  imports: [importCollection(Doctor)],
  providers: [DoctorService],
  controllers: [DoctorController],
  exports: [DoctorService],
})
export class DoctorModule {}
