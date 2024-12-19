import { ModuleMetadata } from '@nestjs/common'
import { PatientAssertExistsUseCase } from './use-case/assert-exists'
import { PatientAuthorizePopulatesUseCase } from './use-case/authorize-populates'
import { PatientCreateUseCase } from './use-case/create'
import { PatientDeleteUseCase } from './use-case/delete'
import { PatientFindOneUseCase } from './use-case/find-one'
import { PatientGetCategoryUseCase } from './use-case/get-category'
import { PatientSearchUseCase } from './use-case/search'
import { PatientUpdateUseCase } from './use-case/update'
import { PatientValidateUseCase } from './use-case/validate'

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
