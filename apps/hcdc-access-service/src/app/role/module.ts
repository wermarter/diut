import { ModuleMetadata } from '@nestjs/common'

import { RoleCreateUseCase } from './use-case/create'
import { RoleFindOneUseCase } from './use-case/find-one'
import { RoleUpdateUseCase } from './use-case/update'
import { RoleDeleteUseCase } from './use-case/delete'
import { RoleSearchUseCase } from './use-case/search'
import { RoleAssertExistsUseCase } from './use-case/assert-exists'
import { RoleValidateUseCase } from './use-case/validate'
import { RoleAuthorizePopulatesUseCase } from './use-case/authorize-populates'

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
