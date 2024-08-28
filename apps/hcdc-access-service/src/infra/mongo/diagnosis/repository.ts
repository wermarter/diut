import { MongoRepository } from '@diut/nestjs-infra'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { IDiagnosisRepository } from 'src/domain'
import { DiagnosisSchema } from './schema'

export class DiagnosisRepository
  extends MongoRepository<DiagnosisSchema>
  implements IDiagnosisRepository
{
  constructor(
    @InjectModel(DiagnosisSchema.name) model: Model<DiagnosisSchema>,
  ) {
    super(model)
  }
}
