import { ModuleMetadata } from '@nestjs/common'
import { ConfigModule, MongoModule } from '@diut/nest-core'

import { MongoConfig, loadMongoConfig } from 'src/config'
import {
  BioProductRepositoryToken,
  BranchRepositoryToken,
  DiagnosisRepositoryToken,
  DoctorRepositoryToken,
  InstrumentRepositoryToken,
  PatientRepositoryToken,
  PatientTypeRepositoryToken,
  PrintFormRepositoryToken,
  RoleRepositoryToken,
  SampleRepositoryToken,
  SampleTypeRepositoryToken,
  TestCategoryRepositoryToken,
  TestComboRepositoryToken,
  TestElementRepositoryToken,
  TestRepositoryToken,
  UserRepositoryToken,
} from 'src/domain'
import { BioProductSchema, BioProductRepository } from './bio-product'
import { TestCategoryRepository, TestCategorySchema } from './test-category'
import { UserRepository, UserSchema } from './user'
import { BranchRepository, BranchSchema } from './branch'
import { RoleRepository, RoleSchema } from './role'
import { InstrumentRepository, InstrumentSchema } from './instrument'
import { SampleTypeRepository, SampleTypeSchema } from './sample-type'
import { DoctorRepository, DoctorSchema } from './doctor'
import { PatientTypeRepository, PatientTypeSchema } from './patient-type'
import { DiagnosisRepository, DiagnosisSchema } from './diagnosis'
import { PrintFormRepository, PrintFormSchema } from './print-form'
import { TestRepository, TestSchema } from './test'
import { TestElementRepository, TestElementSchema } from './test-element'
import { PatientRepository, PatientSchema } from './patient'
import { TestComboRepository, TestComboSchema } from './test-combo'
import { SampleRepository, SampleSchema } from './sample'

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
    MongoModule.forFeature(PatientTypeSchema),
    MongoModule.forFeature(DiagnosisSchema),
    MongoModule.forFeature(TestCategorySchema),
    MongoModule.forFeature(UserSchema),
    MongoModule.forFeature(BranchSchema),
    MongoModule.forFeature(RoleSchema),
    MongoModule.forFeature(InstrumentSchema),
    MongoModule.forFeature(SampleTypeSchema),
    MongoModule.forFeature(DoctorSchema),
    MongoModule.forFeature(PrintFormSchema),
    MongoModule.forFeature(TestSchema),
    MongoModule.forFeature(TestElementSchema),
    MongoModule.forFeature(PatientSchema),
    MongoModule.forFeature(TestComboSchema),
    MongoModule.forFeature(SampleSchema),
  ],
  providers: [
    {
      provide: BioProductRepositoryToken,
      useClass: BioProductRepository,
    },
    {
      provide: PatientTypeRepositoryToken,
      useClass: PatientTypeRepository,
    },
    {
      provide: DiagnosisRepositoryToken,
      useClass: DiagnosisRepository,
    },
    {
      provide: DoctorRepositoryToken,
      useClass: DoctorRepository,
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
    {
      provide: PrintFormRepositoryToken,
      useClass: PrintFormRepository,
    },
    {
      provide: TestRepositoryToken,
      useClass: TestRepository,
    },
    {
      provide: TestElementRepositoryToken,
      useClass: TestElementRepository,
    },
    {
      provide: PatientRepositoryToken,
      useClass: PatientRepository,
    },
    {
      provide: TestComboRepositoryToken,
      useClass: TestComboRepository,
    },
    {
      provide: SampleRepositoryToken,
      useClass: SampleRepository,
    },
  ],
}
