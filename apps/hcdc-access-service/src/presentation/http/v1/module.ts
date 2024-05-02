import { concatModuleMetadata } from '@diut/nestjs-infra'
import { Module, ModuleMetadata } from '@nestjs/common'
import { ClassConstructor } from 'class-transformer'

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
import { PrintFormController } from './print-form/controller'
import { TestController } from './test/controller'
import { TestElementController } from './test-element/controller'
import { PatientController } from './patient/controller'
import { TestComboController } from './test-combo/controller'
import { SampleController } from './sample/controller'
import { ReportController } from './report/controller'
import { AuthServiceToken, IAuthService } from 'src/domain'
import { HttpAuthService, commonModuleMetadata } from '../common'

export const httpControllerV1Metadata: ModuleMetadata = {}
@Module(
  concatModuleMetadata([
    ...commonModuleMetadata,
    {
      providers: [
        HttpAuthService,
        {
          provide: AuthServiceToken,
          useExisting: HttpAuthService satisfies ClassConstructor<IAuthService>,
        },
      ],
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
        PrintFormController,
        TestController,
        TestElementController,
        PatientController,
        TestComboController,
        SampleController,
        ReportController,
      ],
    },
  ]),
)
export class HttpV1Module {}
