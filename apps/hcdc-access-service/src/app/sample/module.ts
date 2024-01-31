import { ModuleMetadata } from '@nestjs/common'

import { SampleCreateUseCase } from './create'
import { SampleUpdateUseCase } from './update'
import { SampleUpdateInfoUseCase } from './update-info'
import { SampleUpdateResultUseCase } from './update-result'
import { SampleValidateUseCase } from './validate'
import { SampleFindOneUseCase } from './find-one'
import { SampleDeleteUseCase } from './delete'
import { SampleDeleteManyUseCase } from './delete-many'
import { SampleSearchUseCase } from './search'
import { SampleAssertExistsUseCase } from './assert-exists'
import { SampleAuthorizePopulatesUseCase } from './authorize-populates'
import { SampleInitResultUseCase } from './init-result'

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
