import { ModuleMetadata } from '@nestjs/common'

import { BioProductCreateUseCase } from './create'
import { BioProductFindOneUseCase } from './find-one'
import { BioProductUpdateUseCase } from './update'
import { BioProductDeleteUseCase } from './delete'
import { BioProductSearchUseCase } from './search'
import { BioProductAssertExistsUseCase } from './assert-exists'
import { BioProductValidateUseCase } from './validate'
import { BioProductAuthorizePopulatesUseCase } from './authorize-populates'

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
