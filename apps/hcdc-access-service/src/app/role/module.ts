import { ModuleMetadata } from '@nestjs/common'

import { RoleCreateUseCase } from './create'
import { RoleFindOneUseCase } from './find-one'
import { RoleUpdateUseCase } from './update'
import { RoleDeleteUseCase } from './delete'
import { RoleSearchUseCase } from './search'
import { RoleAssertExistsUseCase } from './assert-exists'
import { RoleValidateUseCase } from './validate'
import { RoleAuthorizePopulatesUseCase } from './authorize-populates'

export const roleMetadata: ModuleMetadata = {
  providers: [
    RoleCreateUseCase,
    RoleFindOneUseCase,
    RoleUpdateUseCase,
    RoleDeleteUseCase,
    RoleSearchUseCase,
    RoleAssertExistsUseCase,
    RoleValidateUseCase,
    RoleAuthorizePopulatesUseCase,
  ],
}
