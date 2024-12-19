import { ModuleMetadata } from '@nestjs/common'
import { RoleAssertExistsUseCase } from './use-case/assert-exists'
import { RoleAuthorizePopulatesUseCase } from './use-case/authorize-populates'
import { RoleCreateUseCase } from './use-case/create'
import { RoleDeleteUseCase } from './use-case/delete'
import { RoleFindOneUseCase } from './use-case/find-one'
import { RoleSearchUseCase } from './use-case/search'
import { RoleUpdateUseCase } from './use-case/update'
import { RoleValidateUseCase } from './use-case/validate'

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
