import { ModuleMetadata } from '@nestjs/common'
import { MongoModule } from '@diut/nest-core'

import { BioProductRepositoryToken } from 'src/domain'
import { BioProductRepository } from './repository'
import { BioProductSchema } from './schema'

export const bioProductMetadata: ModuleMetadata = {
  imports: [MongoModule.forFeature(BioProductSchema)],
  providers: [
    {
      provide: BioProductRepositoryToken,
      useClass: BioProductRepository,
    },
  ],
}
