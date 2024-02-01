import { ModuleMetadata } from '@nestjs/common'

import { BranchCreateUseCase } from './use-case/create'
import { BranchFindOneUseCase } from './use-case/find-one'
import { BranchUpdateUseCase } from './use-case/update'
import { BranchDeleteUseCase } from './use-case/delete'
import { BranchSearchUseCase } from './use-case/search'
import { BranchAssertExistsUseCase } from './use-case/assert-exists'
import { BranchValidateUseCase } from './use-case/validate'
import { BranchAuthorizePopulatesUseCase } from './use-case/authorize-populates'

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
