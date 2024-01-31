import { ModuleMetadata } from '@nestjs/common'

import { PatientTypeCreateUseCase } from './create'
import { PatientTypeFindOneUseCase } from './find-one'
import { PatientTypeUpdateUseCase } from './update'
import { PatientTypeDeleteUseCase } from './delete'
import { PatientTypeSearchUseCase } from './search'
import { PatientTypeAssertExistsUseCase } from './assert-exists'
import { PatientTypeValidateUseCase } from './validate'
import { PatientTypeAuthorizePopulatesUseCase } from './authorize-populates'

export const patientTypeMetadata: ModuleMetadata = {
  providers: [
    PatientTypeCreateUseCase,
    PatientTypeFindOneUseCase,
    PatientTypeUpdateUseCase,
    PatientTypeDeleteUseCase,
    PatientTypeSearchUseCase,
    PatientTypeAssertExistsUseCase,
    PatientTypeValidateUseCase,
    PatientTypeAuthorizePopulatesUseCase,
  ],
}
