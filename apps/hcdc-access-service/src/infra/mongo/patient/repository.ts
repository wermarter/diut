import { MongoRepository } from '@diut/nestjs-infra'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { IPatientRepository } from 'src/domain'
import { PatientSchema } from './schema'

export class PatientRepository
  extends MongoRepository<PatientSchema>
  implements IPatientRepository
{
  constructor(@InjectModel(PatientSchema.name) model: Model<PatientSchema>) {
    super(model)
  }
}
