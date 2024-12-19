import { concatModuleMetadata } from '@diut/nestjs-infra'
import { Module, ModuleMetadata } from '@nestjs/common'
import { AUTH_SERVICE_TOKEN } from 'src/domain'
import { commonModuleMetadata } from '../shared'
import { AuthController } from './auth/controller'
import { AuthServiceHttpV1 } from './auth/service/auth'
import { AuthCookieService } from './auth/service/cookie'
import { AuthTokenService } from './auth/service/token'
import { BioProductController } from './bio-product/controller'
import { BranchController } from './branch/controller'
import { DiagnosisController } from './diagnosis/controller'
import { DoctorController } from './doctor/controller'
import { InstrumentController } from './instrument/controller'
import { PatientTypeController } from './patient-type/controller'
import { PatientController } from './patient/controller'
import { PrintFormController } from './print-form/controller'
import { ReportController } from './report/controller'
import { RoleController } from './role/controller'
import { SampleTypeController } from './sample-type/controller'
import { SampleController } from './sample/controller'
import { TestCategoryController } from './test-category/controller'
import { TestComboController } from './test-combo/controller'
import { TestElementController } from './test-element/controller'
import { TestController } from './test/controller'
import { UserController } from './user/controller'

export const httpControllerV1Metadata: ModuleMetadata = {}
@Module(
  concatModuleMetadata([
    ...commonModuleMetadata,
    {
      providers: [
        AuthTokenService,
        AuthCookieService,
        {
          provide: AUTH_SERVICE_TOKEN,
          useClass: AuthServiceHttpV1,
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
