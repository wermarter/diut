import { ModuleMetadata } from '@nestjs/common'

import { TestElementAssertExistsUseCase } from './use-case/assert-exists'
import { TestElementAuthorizePopulatesUseCase } from './use-case/authorize-populates'
import { TestElementCreateUseCase } from './use-case/create'
import { TestElementDeleteUseCase } from './use-case/delete'
import { TestElementFindOneUseCase } from './use-case/find-one'
import { TestElementSearchUseCase } from './use-case/search'
import { TestElementUpdateUseCase } from './use-case/update'
import { TestElementValidateUseCase } from './use-case/validate'

export const testElementMetadata: ModuleMetadata = {
  providers: [
    TestElementCreateUseCase,
    TestElementFindOneUseCase,
    TestElementUpdateUseCase,
    TestElementDeleteUseCase,
    TestElementSearchUseCase,
    TestElementAssertExistsUseCase,
    TestElementValidateUseCase,
    TestElementAuthorizePopulatesUseCase,
  ],
}
