import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { MongoRepository } from '@diut/server-core'
import { BioProduct } from './bio-product.schema'

@Injectable()
export class BioProductService extends MongoRepository<BioProduct> {
  constructor(@InjectModel(BioProduct.name) model: Model<BioProduct>) {
    super(model)
  }
}
