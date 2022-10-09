import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { BaseMongoService } from 'src/clients/mongo'
import { PatientType } from './patient-type.schema'

@Injectable()
export class PatientTypeService extends BaseMongoService<PatientType> {
  constructor(@InjectModel(PatientType.name) model: Model<PatientType>) {
    super(model, new Logger(PatientTypeService.name))
  }
}
