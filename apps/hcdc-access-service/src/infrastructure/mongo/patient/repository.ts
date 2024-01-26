import { InjectModel } from '@nestjs/mongoose'
import { MongoRepository } from '@diut/nest-core'
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
