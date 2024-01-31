import { ModuleMetadata } from '@nestjs/common'

import { BranchCreateUseCase } from './create'
import { BranchFindOneUseCase } from './find-one'
import { BranchUpdateUseCase } from './update'
import { BranchDeleteUseCase } from './delete'
import { BranchSearchUseCase } from './search'
import { BranchAssertExistsUseCase } from './assert-exists'
import { BranchValidateUseCase } from './validate'
import { BranchAuthorizePopulatesUseCase } from './authorize-populates'

export const branchMetadata: ModuleMetadata = {
  providers: [
    BranchCreateUseCase,
    BranchFindOneUseCase,
    BranchUpdateUseCase,
    BranchDeleteUseCase,
    BranchSearchUseCase,
    BranchAssertExistsUseCase,
    BranchValidateUseCase,
    BranchAuthorizePopulatesUseCase,
  ],
}
