import { Inject, Injectable } from '@nestjs/common'
import { accessibleBy } from '@casl/mongoose'
import { Role, RoleAction, AuthSubject } from '@diut/hcdc'

import {
  AuthContextToken,
  RoleRepositoryToken,
  IAuthContext,
  IRoleRepository,
  EntitySearchOptions,
  assertPermission,
} from 'src/domain'
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
        $and: [
          input.filter ?? {},
          accessibleBy(ability, RoleAction.Read).ofType(AuthSubject.Role),
        ],
      },
    })

    return paginationResult
  }
}
