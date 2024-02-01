import { ModuleMetadata } from '@nestjs/common'

import { UserCreateUseCase } from './use-case/create'
import { UserUpdateUseCase } from './use-case/update'
import { UserFindOneUseCase } from './use-case/find-one'
import { UserDeleteUseCase } from './use-case/delete'
import { UserSearchUseCase } from './use-case/search'
import { UserAssertExistsUseCase } from './use-case/assert-exists'
import { UserValidateUseCase } from './use-case/validate'
import { UserAuthorizePopulatesUseCase } from './use-case/authorize-populates'
import { UserChangePasswordUseCase } from './use-case/change-password'

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
  ],
}
