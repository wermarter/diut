import { ModuleMetadata } from '@nestjs/common'

import { TestCategoryCreateUseCase } from './create'
import { TestCategoryUpdateUseCase } from './update'
import { TestCategoryValidateUseCase } from './validate'
import { TestCategoryFindOneUseCase } from './find-one'
import { TestCategoryDeleteUseCase } from './delete'
import { TestCategorySearchUseCase } from './search'
import { TestCategoryAssertExistsUseCase } from './assert-exists'
import { TestCategoryAuthorizePopulatesUseCase } from './authorize-populates'

export const testCategoryMetadata: ModuleMetadata = {
  providers: [
    TestCategoryCreateUseCase,
    TestCategoryFindOneUseCase,
    TestCategoryUpdateUseCase,
    TestCategoryDeleteUseCase,
    TestCategorySearchUseCase,
    TestCategoryAssertExistsUseCase,
    TestCategoryValidateUseCase,
    TestCategoryAuthorizePopulatesUseCase,
  ],
}
