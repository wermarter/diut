import { Module } from '@nestjs/common'

import { MongoModule } from '@diut/server-core'
import { DoctorController } from './doctor.controller'
import { Doctor } from './doctor.schema'
import { DoctorService } from './doctor.service'

@Module({
  imports: [MongoModule.forFeature(Doctor)],
  providers: [DoctorService],
  controllers: [DoctorController],
  exports: [DoctorService],
})
export class DoctorModule {}
