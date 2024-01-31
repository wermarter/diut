import { ModuleMetadata } from '@nestjs/common'

import { SampleTypeCreateUseCase } from './create'
import { SampleTypeUpdateUseCase } from './update'
import { SampleTypeValidateUseCase } from './validate'
import { SampleTypeFindOneUseCase } from './find-one'
import { SampleTypeDeleteUseCase } from './delete'
import { SampleTypeSearchUseCase } from './search'
import { SampleTypeAssertExistsUseCase } from './assert-exists'
import { SampleTypeAuthorizePopulatesUseCase } from './authorize-populates'

export const sampleTypeMetadata: ModuleMetadata = {
  providers: [
    SampleTypeCreateUseCase,
    SampleTypeFindOneUseCase,
    SampleTypeUpdateUseCase,
    SampleTypeDeleteUseCase,
    SampleTypeSearchUseCase,
    SampleTypeAssertExistsUseCase,
    SampleTypeValidateUseCase,
    SampleTypeAuthorizePopulatesUseCase,
  ],
}
