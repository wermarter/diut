import { ModuleMetadata } from '@nestjs/common'

import { TestCategoryAssertExistsUseCase } from './use-case/assert-exists'
import { TestCategoryAuthorizePopulatesUseCase } from './use-case/authorize-populates'
import { TestCategoryCreateUseCase } from './use-case/create'
import { TestCategoryDeleteUseCase } from './use-case/delete'
import { TestCategoryFindOneUseCase } from './use-case/find-one'
import { TestCategorySearchUseCase } from './use-case/search'
import { TestCategoryUpdateUseCase } from './use-case/update'
import { TestCategoryValidateUseCase } from './use-case/validate'

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
