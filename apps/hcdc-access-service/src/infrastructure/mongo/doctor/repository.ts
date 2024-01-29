import { InjectModel } from '@nestjs/mongoose'
import { MongoRepository } from '@diut/nestjs-core'
import { Model } from 'mongoose'

import { IDoctorRepository } from 'src/domain'
import { DoctorSchema } from './schema'

export class DoctorRepository
  extends MongoRepository<DoctorSchema>
  implements IDoctorRepository
{
  constructor(@InjectModel(DoctorSchema.name) model: Model<DoctorSchema>) {
    super(model)
  }
}
