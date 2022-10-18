import { Module } from '@nestjs/common'

import { importCollection } from 'src/clients/mongo'
import { BioProductController } from './bio-product.controller'
import { BioProduct } from './bio-product.schema'
import { BioProductService } from './bio-product.service'

@Module({
  imports: [importCollection(BioProduct)],
  providers: [BioProductService],
  controllers: [BioProductController],
  exports: [BioProductService],
})
export class BioProductModule {}
