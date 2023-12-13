import { ModuleMetadata } from '@nestjs/common'

import { BioProductCreateUseCase } from './bio-product/create'
import { BioProductUpdateUseCase } from './bio-product/update'
import { BioProductFindByIdUseCase } from './bio-product/find-by-id'
import { BioProductDeleteUseCase } from './bio-product/delete'
import { BioProductSearchUseCase } from './bio-product/search'
import { TestCategoryCreateUseCase } from './test-category/create'
import { TestCategoryUpdateUseCase } from './test-category/update'
import { TestCategoryFindByIdUseCase } from './test-category/find-by-id'
import { TestCategoryDeleteUseCase } from './test-category/delete'
import { TestCategorySearchUseCase } from './test-category/search'

export const useCaseMetadata: ModuleMetadata = {
  providers: [
    BioProductCreateUseCase,
    BioProductFindByIdUseCase,
    BioProductUpdateUseCase,
    BioProductDeleteUseCase,
    BioProductSearchUseCase,

    TestCategoryCreateUseCase,
    TestCategoryFindByIdUseCase,
    TestCategoryUpdateUseCase,
    TestCategoryDeleteUseCase,
    TestCategorySearchUseCase,
  ],
}
