import { InjectModel } from '@nestjs/mongoose'
import { MongoRepository } from '@diut/nest-core'
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
