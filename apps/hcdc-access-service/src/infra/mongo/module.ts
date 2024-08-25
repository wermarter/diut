import { ModuleMetadata } from '@nestjs/common'
import { MongoModule } from '@diut/nestjs-infra'

import { MongoConfig, loadMongoConfig } from 'src/config'
import {
  BIOPRODUCT_REPO_TOKEN,
  BRANCH_REPO_TOKEN,
  DIAGNOSIS_REPO_TOKEN,
  DOCTOR_REPO_TOKEN,
  INSTRUMENT_REPO_TOKEN,
  PATIENT_REPO_TOKEN,
  PATIENTTYPE_REPO_TOKEN,
  PRINTFORM_REPO_TOKEN,
  ROLE_REPO_TOKEN,
  SAMPLE_REPO_TOKEN,
  SAMPLETYPE_REPO_TOKEN,
  TESTCATEGORY_REPO_TOKEN,
  TESTCOMBO_REPO_TOKEN,
  TESTELEMENT_REPO_TOKEN,
  TEST_REPO_TOKEN,
  USER_REPO_TOKEN,
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
      provide: BIOPRODUCT_REPO_TOKEN,
      useClass: BioProductRepository,
    },
    {
      provide: PATIENTTYPE_REPO_TOKEN,
      useClass: PatientTypeRepository,
    },
    {
      provide: DIAGNOSIS_REPO_TOKEN,
      useClass: DiagnosisRepository,
    },
    {
      provide: DOCTOR_REPO_TOKEN,
      useClass: DoctorRepository,
    },
    {
      provide: INSTRUMENT_REPO_TOKEN,
      useClass: InstrumentRepository,
    },
    {
      provide: SAMPLETYPE_REPO_TOKEN,
      useClass: SampleTypeRepository,
    },
    {
      provide: TESTCATEGORY_REPO_TOKEN,
      useClass: TestCategoryRepository,
    },
    {
      provide: USER_REPO_TOKEN,
      useClass: UserRepository,
    },
    {
      provide: BRANCH_REPO_TOKEN,
      useClass: BranchRepository,
    },
    {
      provide: ROLE_REPO_TOKEN,
      useClass: RoleRepository,
    },
    {
      provide: PRINTFORM_REPO_TOKEN,
      useClass: PrintFormRepository,
    },
    {
      provide: TEST_REPO_TOKEN,
      useClass: TestRepository,
    },
    {
      provide: TESTELEMENT_REPO_TOKEN,
      useClass: TestElementRepository,
    },
    {
      provide: PATIENT_REPO_TOKEN,
      useClass: PatientRepository,
    },
    {
      provide: TESTCOMBO_REPO_TOKEN,
      useClass: TestComboRepository,
    },
    {
      provide: SAMPLE_REPO_TOKEN,
      useClass: SampleRepository,
    },
  ],
}
