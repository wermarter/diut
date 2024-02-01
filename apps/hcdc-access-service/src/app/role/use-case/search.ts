import { Inject, Injectable } from '@nestjs/common'
import { accessibleBy } from '@casl/mongoose'

import {
  AuthContextToken,
  RoleRepositoryToken,
  IAuthContext,
  IRoleRepository,
  EntitySearchOptions,
} from 'src/domain/interface'
import { Role, RoleAction } from 'src/domain/entity'
import { AuthSubject, assertPermission } from 'src/domain/auth'
import { RoleAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class RoleSearchUseCase {
  constructor(
    @Inject(RoleRepositoryToken)
    private readonly roleRepository: IRoleRepository,
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    private readonly roleAuthorizePopulatesUseCase: RoleAuthorizePopulatesUseCase,
  ) {}

  async execute(input: EntitySearchOptions<Role>) {
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Role, RoleAction.Read)
    input.populates = this.roleAuthorizePopulatesUseCase.execute(
      input.populates,
    )

    const paginationResult = await this.roleRepository.search({
      ...input,
      filter: {
        $and: [input.filter ?? {}, accessibleBy(ability, RoleAction.Read).Role],
      },
    })

    return paginationResult
  }
}
