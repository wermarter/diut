import { ModuleMetadata } from '@nestjs/common'
import { TestAssertExistsUseCase } from './use-case/assert-exists'
import { TestAuthorizePopulatesUseCase } from './use-case/authorize-populates'
import { TestCreateUseCase } from './use-case/create'
import { TestDeleteUseCase } from './use-case/delete'
import { TestFindOneUseCase } from './use-case/find-one'
import { TestSearchUseCase } from './use-case/search'
import { TestUpdateUseCase } from './use-case/update'
import { TestValidateUseCase } from './use-case/validate'

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
