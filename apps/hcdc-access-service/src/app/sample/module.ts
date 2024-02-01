import { ModuleMetadata } from '@nestjs/common'

import { SampleCreateUseCase } from './use-case/create'
import { SampleUpdateUseCase } from './use-case/update'
import { SampleUpdateInfoUseCase } from './use-case/update-info'
import { SampleUpdateResultUseCase } from './use-case/update-result'
import { SampleValidateUseCase } from './use-case/validate'
import { SampleFindOneUseCase } from './use-case/find-one'
import { SampleDeleteUseCase } from './use-case/delete'
import { SampleDeleteManyUseCase } from './use-case/delete-many'
import { SampleSearchUseCase } from './use-case/search'
import { SampleAssertExistsUseCase } from './use-case/assert-exists'
import { SampleAuthorizePopulatesUseCase } from './use-case/authorize-populates'
import { SampleInitResultUseCase } from './use-case/init-result'

export const sampleMetadata: ModuleMetadata = {
  providers: [
    SampleCreateUseCase,
    SampleFindOneUseCase,
    SampleUpdateUseCase,
    SampleUpdateInfoUseCase,
    SampleUpdateResultUseCase,
    SampleDeleteUseCase,
    SampleDeleteManyUseCase,
    SampleSearchUseCase,
    SampleAssertExistsUseCase,
    SampleValidateUseCase,
    SampleAuthorizePopulatesUseCase,
    SampleInitResultUseCase,
  ],
}
