import { ModuleMetadata } from '@nestjs/common'

import { BioProductCreateUseCase } from './bio-product/create'
import { BioProductUpdateUseCase } from './bio-product/update'
import { BioProductFindOneUseCase } from './bio-product/find-one'
import { BioProductDeleteUseCase } from './bio-product/delete'
import { BioProductSearchUseCase } from './bio-product/search'
import { BioProductAssertExistsUseCase } from './bio-product/assert-exists'

import { RoleCreateUseCase } from './role/create'
import { RoleUpdateUseCase } from './role/update'
import { RoleFindOneUseCase } from './role/find-one'
import { RoleDeleteUseCase } from './role/delete'
import { RoleSearchUseCase } from './role/search'
import { RoleAssertExistsUseCase } from './role/assert-exists'

import { BranchCreateUseCase } from './branch/create'
import { BranchUpdateUseCase } from './branch/update'
import { BranchFindOneUseCase } from './branch/find-one'
import { BranchDeleteUseCase } from './branch/delete'
import { BranchSearchUseCase } from './branch/search'
import { BranchAssertExistsUseCase } from './branch/assert-exists'

import { AuthMeUseCase } from './auth/me'
import { UserFindOneUseCase } from './user/find-one'
import { AuthLoginUseCase } from './auth/login'
import { AuthPopulateContextUseCase } from './auth/populate-context'

export const useCaseMetadata: ModuleMetadata = {
  providers: [
    AuthMeUseCase,
    AuthLoginUseCase,
    AuthPopulateContextUseCase,

    UserFindOneUseCase,

    BioProductCreateUseCase,
    BioProductFindOneUseCase,
    BioProductUpdateUseCase,
    BioProductDeleteUseCase,
    BioProductSearchUseCase,
    BioProductAssertExistsUseCase,

    BranchCreateUseCase,
    BranchFindOneUseCase,
    BranchUpdateUseCase,
    BranchDeleteUseCase,
    BranchSearchUseCase,
    BranchAssertExistsUseCase,

    RoleCreateUseCase,
    RoleFindOneUseCase,
    RoleUpdateUseCase,
    RoleDeleteUseCase,
    RoleSearchUseCase,
    RoleAssertExistsUseCase,
  ],
}
