import { ModuleMetadata } from '@nestjs/common'

import { InstrumentCreateUseCase } from './use-case/create'
import { InstrumentFindOneUseCase } from './use-case/find-one'
import { InstrumentUpdateUseCase } from './use-case/update'
import { InstrumentDeleteUseCase } from './use-case/delete'
import { InstrumentSearchUseCase } from './use-case/search'
import { InstrumentAssertExistsUseCase } from './use-case/assert-exists'
import { InstrumentValidateUseCase } from './use-case/validate'
import { InstrumentAuthorizePopulatesUseCase } from './use-case/authorize-populates'

export const instrumentMetadata: ModuleMetadata = {
  providers: [
    InstrumentCreateUseCase,
    InstrumentFindOneUseCase,
    InstrumentUpdateUseCase,
    InstrumentDeleteUseCase,
    InstrumentSearchUseCase,
    InstrumentAssertExistsUseCase,
    InstrumentValidateUseCase,
    InstrumentAuthorizePopulatesUseCase,
  ],
}
