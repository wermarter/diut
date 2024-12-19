import { ModuleMetadata } from '@nestjs/common'
import { InstrumentAssertExistsUseCase } from './use-case/assert-exists'
import { InstrumentAuthorizePopulatesUseCase } from './use-case/authorize-populates'
import { InstrumentCreateUseCase } from './use-case/create'
import { InstrumentDeleteUseCase } from './use-case/delete'
import { InstrumentFindOneUseCase } from './use-case/find-one'
import { InstrumentSearchUseCase } from './use-case/search'
import { InstrumentUpdateUseCase } from './use-case/update'
import { InstrumentValidateUseCase } from './use-case/validate'

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
