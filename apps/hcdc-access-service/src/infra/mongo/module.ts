import { MongoModule } from '@diut/nestjs-infra'
import { ModuleMetadata } from '@nestjs/common'
import { Schema } from 'mongoose'

import { MongoConfig, loadMongoConfig } from 'src/config'
import {
  BIOPRODUCT_REPO_TOKEN,
  BRANCH_REPO_TOKEN,
  DIAGNOSIS_REPO_TOKEN,
  DOCTOR_REPO_TOKEN,
  INSTRUMENT_REPO_TOKEN,
  PATIENTTYPE_REPO_TOKEN,
  PATIENT_REPO_TOKEN,
  PRINTFORM_REPO_TOKEN,
  ROLE_REPO_TOKEN,
  SAMPLETYPE_REPO_TOKEN,
  SAMPLE_REPO_TOKEN,
  TESTCATEGORY_REPO_TOKEN,
  TESTCOMBO_REPO_TOKEN,
  TESTELEMENT_REPO_TOKEN,
  TEST_REPO_TOKEN,
  USER_REPO_TOKEN,
} from 'src/domain'
import { BioProductRepository, BioProductSchema } from './bio-product'
import { BranchRepository, BranchSchema } from './branch'
import { DiagnosisRepository, DiagnosisSchema } from './diagnosis'
import { DoctorRepository, DoctorSchema } from './doctor'
import { InstrumentRepository, InstrumentSchema } from './instrument'
import { PatientRepository, PatientSchema } from './patient'
import { PatientTypeRepository, PatientTypeSchema } from './patient-type'
import { PrintFormRepository, PrintFormSchema } from './print-form'
import { RoleRepository, RoleSchema } from './role'
import { SampleRepository, SampleSchema } from './sample'
import { SampleTypeRepository, SampleTypeSchema } from './sample-type'
import { TestRepository, TestSchema } from './test'
import { TestCategoryRepository, TestCategorySchema } from './test-category'
import { TestComboRepository, TestComboSchema } from './test-combo'
import { TestElementRepository, TestElementSchema } from './test-element'
import { UserRepository, UserSchema } from './user'

function schemaHook(schema: Schema) {
  // schema.plugin(accessibleRecordsPlugin)
}

export const mongoMetadata: ModuleMetadata = {
  imports: [
    MongoModule.forRootAsync({
      inject: [loadMongoConfig.KEY],
      useFactory: async (mongoConfig: MongoConfig) => ({
        uri: mongoConfig.MONGO_URI,
      }),
    }),
    MongoModule.forFeature(BioProductSchema, schemaHook),
    MongoModule.forFeature(PatientTypeSchema, schemaHook),
    MongoModule.forFeature(DiagnosisSchema, schemaHook),
    MongoModule.forFeature(TestCategorySchema, schemaHook),
    MongoModule.forFeature(UserSchema, schemaHook),
    MongoModule.forFeature(BranchSchema, schemaHook),
    MongoModule.forFeature(RoleSchema, schemaHook),
    MongoModule.forFeature(InstrumentSchema, schemaHook),
    MongoModule.forFeature(SampleTypeSchema, schemaHook),
    MongoModule.forFeature(DoctorSchema, schemaHook),
    MongoModule.forFeature(PrintFormSchema, schemaHook),
    MongoModule.forFeature(TestSchema, schemaHook),
    MongoModule.forFeature(TestElementSchema, schemaHook),
    MongoModule.forFeature(PatientSchema, schemaHook),
    MongoModule.forFeature(TestComboSchema, schemaHook),
    MongoModule.forFeature(SampleSchema, schemaHook),
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
