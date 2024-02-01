import { ModuleMetadata } from '@nestjs/common'

import { PatientTypeCreateUseCase } from './use-case/create'
import { PatientTypeFindOneUseCase } from './use-case/find-one'
import { PatientTypeUpdateUseCase } from './use-case/update'
import { PatientTypeDeleteUseCase } from './use-case/delete'
import { PatientTypeSearchUseCase } from './use-case/search'
import { PatientTypeAssertExistsUseCase } from './use-case/assert-exists'
import { PatientTypeValidateUseCase } from './use-case/validate'
import { PatientTypeAuthorizePopulatesUseCase } from './use-case/authorize-populates'

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
