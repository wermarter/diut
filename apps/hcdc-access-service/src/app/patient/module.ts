import { ModuleMetadata } from '@nestjs/common'

import { PatientCreateUseCase } from './create'
import { PatientFindOneUseCase } from './find-one'
import { PatientUpdateUseCase } from './update'
import { PatientDeleteUseCase } from './delete'
import { PatientSearchUseCase } from './search'
import { PatientAssertExistsUseCase } from './assert-exists'
import { PatientValidateUseCase } from './validate'
import { PatientAuthorizePopulatesUseCase } from './authorize-populates'
import { PatientGetCategoryUseCase } from './get-category'

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
