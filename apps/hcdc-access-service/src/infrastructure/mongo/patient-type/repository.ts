import { InjectModel } from '@nestjs/mongoose'
import { MongoRepository } from '@diut/nestjs-core'
import { Model } from 'mongoose'

import { IPatientTypeRepository } from 'src/domain'
import { PatientTypeSchema } from './schema'

export class PatientTypeRepository
  extends MongoRepository<PatientTypeSchema>
  implements IPatientTypeRepository
{
  constructor(
    @InjectModel(PatientTypeSchema.name) model: Model<PatientTypeSchema>,
  ) {
    super(model)
  }
}
