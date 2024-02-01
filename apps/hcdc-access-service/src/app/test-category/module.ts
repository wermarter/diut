import { ModuleMetadata } from '@nestjs/common'

import { TestCategoryCreateUseCase } from './use-case/create'
import { TestCategoryUpdateUseCase } from './use-case/update'
import { TestCategoryValidateUseCase } from './use-case/validate'
import { TestCategoryFindOneUseCase } from './use-case/find-one'
import { TestCategoryDeleteUseCase } from './use-case/delete'
import { TestCategorySearchUseCase } from './use-case/search'
import { TestCategoryAssertExistsUseCase } from './use-case/assert-exists'
import { TestCategoryAuthorizePopulatesUseCase } from './use-case/authorize-populates'

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
