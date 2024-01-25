import { ModuleMetadata } from '@nestjs/common'

import { BioProductController } from './bio-product/controller'
import { AuthController } from './auth/controller'
import { RoleController } from './role/controller'
import { BranchController } from './branch/controller'
import { UserController } from './user/controller'
import { TestCategoryController } from './test-category/controller'
import { InstrumentController } from './instrument/controller'
import { SampleTypeController } from './sample-type/controller'
import { DoctorController } from './doctor/controller'
import { PatientTypeController } from './patient-type/controller'
import { DiagnosisController } from './diagnosis/controller'

export const httpControllerV1Metadata: ModuleMetadata = {
  controllers: [
    BioProductController,
    PatientTypeController,
    DiagnosisController,
    DoctorController,
    InstrumentController,
    SampleTypeController,
    AuthController,
    RoleController,
    BranchController,
    UserController,
    TestCategoryController,
  ],
  providers: [],
}
