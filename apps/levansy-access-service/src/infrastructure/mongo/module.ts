import { ModuleMetadata } from '@nestjs/common'
import { ConfigModule, MongoModule } from '@diut/nest-core'

import { MongoConfig, loadMongoConfig } from '../config'
import {
  BioProductRepositoryToken,
  TestCategoryRepositoryToken,
  UserRepositoryToken,
} from 'src/domain'
import { BioProductSchema, BioProductRepository } from './bio-product'
import { TestCategoryRepository, TestCategorySchema } from './test-category'
import { UserRepository, UserSchema } from './user'

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
    MongoModule.forFeature(TestCategorySchema),
    MongoModule.forFeature(UserSchema),
  ],
  providers: [
    {
      provide: BioProductRepositoryToken,
      useClass: BioProductRepository,
    },
    {
      provide: TestCategoryRepositoryToken,
      useClass: TestCategoryRepository,
    },
    {
      provide: UserRepositoryToken,
      useClass: UserRepository,
    },
  ],
}
