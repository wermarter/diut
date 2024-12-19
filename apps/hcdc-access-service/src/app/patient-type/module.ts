import { ModuleMetadata } from '@nestjs/common'
import { PatientTypeAssertExistsUseCase } from './use-case/assert-exists'
import { PatientTypeAuthorizePopulatesUseCase } from './use-case/authorize-populates'
import { PatientTypeCreateUseCase } from './use-case/create'
import { PatientTypeDeleteUseCase } from './use-case/delete'
import { PatientTypeFindOneUseCase } from './use-case/find-one'
import { PatientTypeSearchUseCase } from './use-case/search'
import { PatientTypeUpdateUseCase } from './use-case/update'
import { PatientTypeValidateUseCase } from './use-case/validate'

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
