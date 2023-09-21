import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { MongoRepository } from '@diut/server-core'
import { PatientType } from './patient-type.schema'

@Injectable()
export class PatientTypeService extends MongoRepository<PatientType> {
  constructor(@InjectModel(PatientType.name) model: Model<PatientType>) {
    super(model)
  }
}
