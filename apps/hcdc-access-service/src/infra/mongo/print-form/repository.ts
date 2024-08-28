import { MongoRepository } from '@diut/nestjs-infra'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { IPrintFormRepository } from 'src/domain'
import { PrintFormSchema } from './schema'

export class PrintFormRepository
  extends MongoRepository<PrintFormSchema>
  implements IPrintFormRepository
{
  constructor(
    @InjectModel(PrintFormSchema.name) model: Model<PrintFormSchema>,
  ) {
    super(model)
  }
}
