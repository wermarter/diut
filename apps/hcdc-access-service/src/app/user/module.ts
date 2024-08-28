import { ModuleMetadata } from '@nestjs/common'

import { UserAssertExistsUseCase } from './use-case/assert-exists'
import { UserAuthorizePopulatesUseCase } from './use-case/authorize-populates'
import { UserBranchAuthorizeUseCase } from './use-case/branch-authorize'
import { UserBranchDeauthorizeUseCase } from './use-case/branch-deauthorize'
import { UserChangePasswordUseCase } from './use-case/change-password'
import { UserCreateUseCase } from './use-case/create'
import { UserDeleteUseCase } from './use-case/delete'
import { UserFindOneUseCase } from './use-case/find-one'
import { UserSearchUseCase } from './use-case/search'
import { UserUpdateUseCase } from './use-case/update'
import { UserValidateUseCase } from './use-case/validate'

export const userMetadata: ModuleMetadata = {
  providers: [
    UserCreateUseCase,
    UserFindOneUseCase,
    UserUpdateUseCase,
    UserDeleteUseCase,
    UserSearchUseCase,
    UserAssertExistsUseCase,
    UserValidateUseCase,
    UserAuthorizePopulatesUseCase,
    UserChangePasswordUseCase,
    UserBranchAuthorizeUseCase,
    UserBranchDeauthorizeUseCase,
  ],
}
