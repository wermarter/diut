import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { BaseMongoService } from 'src/clients/mongo'
import { BioProduct } from './bio-product.schema'

@Injectable()
export class BioProductService extends BaseMongoService<BioProduct> {
  constructor(@InjectModel(BioProduct.name) model: Model<BioProduct>) {
    super(model, new Logger(BioProductService.name))
  }
}
