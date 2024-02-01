import { ModuleMetadata } from '@nestjs/common'

import { TestElementCreateUseCase } from './use-case/create'
import { TestElementUpdateUseCase } from './use-case/update'
import { TestElementValidateUseCase } from './use-case/validate'
import { TestElementFindOneUseCase } from './use-case/find-one'
import { TestElementDeleteUseCase } from './use-case/delete'
import { TestElementSearchUseCase } from './use-case/search'
import { TestElementAssertExistsUseCase } from './use-case/assert-exists'
import { TestElementAuthorizePopulatesUseCase } from './use-case/authorize-populates'

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
