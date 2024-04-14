import { ModuleMetadata } from '@nestjs/common'

import { BioProductCreateUseCase } from './use-case/create'
import { BioProductFindOneUseCase } from './use-case/find-one'
import { BioProductUpdateUseCase } from './use-case/update'
import { BioProductDeleteUseCase } from './use-case/delete'
import { BioProductSearchUseCase } from './use-case/search'
import { BioProductAssertExistsUseCase } from './use-case/assert-exists'
import { BioProductValidateUseCase } from './use-case/validate'
import { BioProductAuthorizePopulatesUseCase } from './use-case/authorize-populates'

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
