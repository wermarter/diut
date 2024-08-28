import { ModuleMetadata } from '@nestjs/common'

import { SampleTypeAssertExistsUseCase } from './use-case/assert-exists'
import { SampleTypeAuthorizePopulatesUseCase } from './use-case/authorize-populates'
import { SampleTypeCreateUseCase } from './use-case/create'
import { SampleTypeDeleteUseCase } from './use-case/delete'
import { SampleTypeFindOneUseCase } from './use-case/find-one'
import { SampleTypeSearchUseCase } from './use-case/search'
import { SampleTypeUpdateUseCase } from './use-case/update'
import { SampleTypeValidateUseCase } from './use-case/validate'

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
