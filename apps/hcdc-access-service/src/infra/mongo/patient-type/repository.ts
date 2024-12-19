import { MongoRepository } from '@diut/nestjs-infra'
import { InjectModel } from '@nestjs/mongoose'
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
