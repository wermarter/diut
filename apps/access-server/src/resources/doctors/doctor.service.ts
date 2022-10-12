import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { BaseMongoService } from 'src/clients/mongo'
import { Doctor } from './doctor.schema'

@Injectable()
export class DoctorService extends BaseMongoService<Doctor> {
  constructor(@InjectModel(Doctor.name) model: Model<Doctor>) {
    super(model, new Logger(DoctorService.name))
  }
}
