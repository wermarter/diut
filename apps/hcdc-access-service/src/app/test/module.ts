import { ModuleMetadata } from '@nestjs/common'

import { TestCreateUseCase } from './create'
import { TestUpdateUseCase } from './update'
import { TestValidateUseCase } from './validate'
import { TestFindOneUseCase } from './find-one'
import { TestDeleteUseCase } from './delete'
import { TestSearchUseCase } from './search'
import { TestAssertExistsUseCase } from './assert-exists'
import { TestAuthorizePopulatesUseCase } from './authorize-populates'

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
