import { Module } from '@nestjs/common'

import { MongoModule } from '@diut/server-core'
import { BioProductController } from './bio-product.controller'
import { BioProduct } from './bio-product.schema'
import { BioProductService } from './bio-product.service'

@Module({
  imports: [MongoModule.forFeature([BioProduct])],
  providers: [BioProductService],
  controllers: [BioProductController],
  exports: [BioProductService],
})
export class BioProductModule {}
