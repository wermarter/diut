import {
  ConfigModule,
  MongoModule,
  concatModuleMetadata,
} from '@diut/nest-core'

import { bioProductMetadata } from './bio-product'
import { MongoConfig, loadMongoConfig } from '../config'

export const mongoMetadata = concatModuleMetadata([
  {
    imports: [
      MongoModule.forRootAsync({
        imports: [ConfigModule.forFeature(loadMongoConfig)],
        inject: [loadMongoConfig.KEY],
        useFactory: async (mongoConfig: MongoConfig) => ({
          uri: mongoConfig.MONGO_URI,
        }),
      }),
    ],
  },
  bioProductMetadata,
])
