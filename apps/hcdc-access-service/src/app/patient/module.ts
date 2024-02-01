import { ModuleMetadata } from '@nestjs/common'

import { PatientCreateUseCase } from './use-case/create'
import { PatientFindOneUseCase } from './use-case/find-one'
import { PatientUpdateUseCase } from './use-case/update'
import { PatientDeleteUseCase } from './use-case/delete'
import { PatientSearchUseCase } from './use-case/search'
import { PatientAssertExistsUseCase } from './use-case/assert-exists'
import { PatientValidateUseCase } from './use-case/validate'
import { PatientAuthorizePopulatesUseCase } from './use-case/authorize-populates'
import { PatientGetCategoryUseCase } from './use-case/get-category'

export const patientMetadata: ModuleMetadata = {
  providers: [
    PatientCreateUseCase,
    PatientFindOneUseCase,
    PatientUpdateUseCase,
    PatientDeleteUseCase,
    PatientSearchUseCase,
    PatientAssertExistsUseCase,
    PatientValidateUseCase,
    PatientAuthorizePopulatesUseCase,
    PatientGetCategoryUseCase,
  ],
}
