import { ModuleMetadata } from '@nestjs/common'
import { DoctorAssertExistsUseCase } from './use-case/assert-exists'
import { DoctorAuthorizePopulatesUseCase } from './use-case/authorize-populates'
import { DoctorCreateUseCase } from './use-case/create'
import { DoctorDeleteUseCase } from './use-case/delete'
import { DoctorFindOneUseCase } from './use-case/find-one'
import { DoctorSearchUseCase } from './use-case/search'
import { DoctorUpdateUseCase } from './use-case/update'
import { DoctorValidateUseCase } from './use-case/validate'

export const doctorMetadata: ModuleMetadata = {
  providers: [
    DoctorCreateUseCase,
    DoctorFindOneUseCase,
    DoctorUpdateUseCase,
    DoctorDeleteUseCase,
    DoctorSearchUseCase,
    DoctorAssertExistsUseCase,
    DoctorValidateUseCase,
    DoctorAuthorizePopulatesUseCase,
  ],
}
