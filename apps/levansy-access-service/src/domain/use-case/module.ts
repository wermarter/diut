import { ModuleMetadata } from '@nestjs/common'

import { BioProductCreateUseCase } from './bio-product/create'
import { BioProductUpdateUseCase } from './bio-product/update'
import { BioProductFindByIdUseCase } from './bio-product/find-by-id'
import { BioProductDeleteUseCase } from './bio-product/delete'
import { BioProductSearchUseCase } from './bio-product/search'

export const useCaseMetadata: ModuleMetadata = {
  providers: [
    BioProductCreateUseCase,
    BioProductFindByIdUseCase,
    BioProductUpdateUseCase,
    BioProductDeleteUseCase,
    BioProductSearchUseCase,
  ],
}
