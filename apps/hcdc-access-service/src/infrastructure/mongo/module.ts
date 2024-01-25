import { ModuleMetadata } from '@nestjs/common'
import { ConfigModule, MongoModule } from '@diut/nest-core'

import { MongoConfig, loadMongoConfig } from 'src/config'
import {
  BioProductRepositoryToken,
  BranchRepositoryToken,
  InstrumentRepositoryToken,
  RoleRepositoryToken,
  SampleTypeRepositoryToken,
  TestCategoryRepositoryToken,
  UserRepositoryToken,
} from 'src/domain'
import { BioProductSchema, BioProductRepository } from './bio-product'
import { TestCategoryRepository, TestCategorySchema } from './test-category'
import { UserRepository, UserSchema } from './user'
import { BranchRepository, BranchSchema } from './branch'
import { RoleRepository, RoleSchema } from './role'
import { InstrumentRepository, InstrumentSchema } from './instrument'
import { SampleTypeRepository, SampleTypeSchema } from './sample-type'

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
    MongoModule.forFeature(BranchSchema),
    MongoModule.forFeature(RoleSchema),
    MongoModule.forFeature(InstrumentSchema),
    MongoModule.forFeature(SampleTypeSchema),
  ],
  providers: [
    {
      provide: BioProductRepositoryToken,
      useClass: BioProductRepository,
    },
    {
      provide: InstrumentRepositoryToken,
      useClass: InstrumentRepository,
    },
    {
      provide: SampleTypeRepositoryToken,
      useClass: SampleTypeRepository,
    },
    {
      provide: TestCategoryRepositoryToken,
      useClass: TestCategoryRepository,
    },
    {
      provide: UserRepositoryToken,
      useClass: UserRepository,
    },
    {
      provide: BranchRepositoryToken,
      useClass: BranchRepository,
    },
    {
      provide: RoleRepositoryToken,
      useClass: RoleRepository,
    },
  ],
}
