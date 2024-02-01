import { ModuleMetadata } from '@nestjs/common'

import { SampleTypeCreateUseCase } from './use-case/create'
import { SampleTypeUpdateUseCase } from './use-case/update'
import { SampleTypeValidateUseCase } from './use-case/validate'
import { SampleTypeFindOneUseCase } from './use-case/find-one'
import { SampleTypeDeleteUseCase } from './use-case/delete'
import { SampleTypeSearchUseCase } from './use-case/search'
import { SampleTypeAssertExistsUseCase } from './use-case/assert-exists'
import { SampleTypeAuthorizePopulatesUseCase } from './use-case/authorize-populates'

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
