import { ModuleMetadata } from '@nestjs/common'

import { BioProductAssertExistsUseCase } from './use-case/assert-exists'
import { BioProductAuthorizePopulatesUseCase } from './use-case/authorize-populates'
import { BioProductCreateUseCase } from './use-case/create'
import { BioProductDeleteUseCase } from './use-case/delete'
import { BioProductFindOneUseCase } from './use-case/find-one'
import { BioProductSearchUseCase } from './use-case/search'
import { BioProductUpdateUseCase } from './use-case/update'
import { BioProductValidateUseCase } from './use-case/validate'

export const bioProductMetadata: ModuleMetadata = {
  providers: [
    BioProductCreateUseCase,
    BioProductFindOneUseCase,
    BioProductUpdateUseCase,
    BioProductDeleteUseCase,
    BioProductSearchUseCase,
    BioProductAssertExistsUseCase,
    BioProductValidateUseCase,
    BioProductAuthorizePopulatesUseCase,
  ],
}
