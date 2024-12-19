import { ModuleMetadata } from '@nestjs/common'
import { BranchAssertExistsUseCase } from './use-case/assert-exists'
import { BranchAuthorizePopulatesUseCase } from './use-case/authorize-populates'
import { BranchCreateUseCase } from './use-case/create'
import { BranchDeleteUseCase } from './use-case/delete'
import { BranchFindOneUseCase } from './use-case/find-one'
import { BranchSearchUseCase } from './use-case/search'
import { BranchUpdateUseCase } from './use-case/update'
import { BranchValidateUseCase } from './use-case/validate'

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
