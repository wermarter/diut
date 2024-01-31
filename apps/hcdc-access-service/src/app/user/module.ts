import { ModuleMetadata } from '@nestjs/common'

import { UserCreateUseCase } from './create'
import { UserUpdateUseCase } from './update'
import { UserFindOneUseCase } from './find-one'
import { UserDeleteUseCase } from './delete'
import { UserSearchUseCase } from './search'
import { UserAssertExistsUseCase } from './assert-exists'
import { UserValidateUseCase } from './validate'
import { UserAuthorizePopulatesUseCase } from './authorize-populates'
import { UserChangePasswordUseCase } from './change-password'

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
