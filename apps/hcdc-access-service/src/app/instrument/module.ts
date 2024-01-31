import { ModuleMetadata } from '@nestjs/common'

import { InstrumentCreateUseCase } from './create'
import { InstrumentFindOneUseCase } from './find-one'
import { InstrumentUpdateUseCase } from './update'
import { InstrumentDeleteUseCase } from './delete'
import { InstrumentSearchUseCase } from './search'
import { InstrumentAssertExistsUseCase } from './assert-exists'
import { InstrumentValidateUseCase } from './validate'
import { InstrumentAuthorizePopulatesUseCase } from './authorize-populates'

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
