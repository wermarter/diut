import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { BaseMongoService } from 'src/clients/mongo'
import { Patient } from './patient.schema'

@Injectable()
export class PatientService extends BaseMongoService<Patient> {
  constructor(@InjectModel(Patient.name) model: Model<Patient>) {
    super(model, new Logger(PatientService.name))
  }
}
