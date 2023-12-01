import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { MongoRepository } from '@diut/nest-core'
import { Doctor } from './doctor.schema'

@Injectable()
export class DoctorService extends MongoRepository<Doctor> {
  constructor(@InjectModel(Doctor.name) model: Model<Doctor>) {
    super(model)
  }
}
