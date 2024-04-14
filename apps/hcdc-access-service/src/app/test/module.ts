import { ModuleMetadata } from '@nestjs/common'

import { TestCreateUseCase } from './use-case/create'
import { TestUpdateUseCase } from './use-case/update'
import { TestValidateUseCase } from './use-case/validate'
import { TestFindOneUseCase } from './use-case/find-one'
import { TestDeleteUseCase } from './use-case/delete'
import { TestSearchUseCase } from './use-case/search'
import { TestAssertExistsUseCase } from './use-case/assert-exists'
import { TestAuthorizePopulatesUseCase } from './use-case/authorize-populates'

export const testMetadata: ModuleMetadata = {
  providers: [
    TestCreateUseCase,
    TestFindOneUseCase,
    TestUpdateUseCase,
    TestDeleteUseCase,
    TestSearchUseCase,
    TestAssertExistsUseCase,
    TestValidateUseCase,
    TestAuthorizePopulatesUseCase,
  ],
}
