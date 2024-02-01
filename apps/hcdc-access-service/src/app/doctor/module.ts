import { ModuleMetadata } from '@nestjs/common'

import { DoctorCreateUseCase } from './use-case/create'
import { DoctorFindOneUseCase } from './use-case/find-one'
import { DoctorUpdateUseCase } from './use-case/update'
import { DoctorDeleteUseCase } from './use-case/delete'
import { DoctorSearchUseCase } from './use-case/search'
import { DoctorAssertExistsUseCase } from './use-case/assert-exists'
import { DoctorValidateUseCase } from './use-case/validate'
import { DoctorAuthorizePopulatesUseCase } from './use-case/authorize-populates'

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
