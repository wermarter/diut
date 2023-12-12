import { ModuleMetadata } from '@nestjs/common'
import { ConfigModule, MongoModule } from '@diut/nest-core'

import { MongoConfig, loadMongoConfig } from '../config'
import { BioProductRepositoryToken } from 'src/domain'
import { BioProductSchema, BioProductRepository } from './bio-product'

export const mongoMetadata: ModuleMetadata = {
  imports: [
    MongoModule.forRootAsync({
      imports: [ConfigModule.forFeature(loadMongoConfig)],
      inject: [loadMongoConfig.KEY],
      useFactory: async (mongoConfig: MongoConfig) => ({
        uri: mongoConfig.MONGO_URI,
      }),
    }),
    MongoModule.forFeature(BioProductSchema),
  ],
  providers: [
    {
      provide: BioProductRepositoryToken,
      useClass: BioProductRepository,
    },
  ],
}
