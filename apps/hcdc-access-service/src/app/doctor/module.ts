import { ModuleMetadata } from '@nestjs/common'

import { DoctorCreateUseCase } from './create'
import { DoctorFindOneUseCase } from './find-one'
import { DoctorUpdateUseCase } from './update'
import { DoctorDeleteUseCase } from './delete'
import { DoctorSearchUseCase } from './search'
import { DoctorAssertExistsUseCase } from './assert-exists'
import { DoctorValidateUseCase } from './validate'
import { DoctorAuthorizePopulatesUseCase } from './authorize-populates'

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
