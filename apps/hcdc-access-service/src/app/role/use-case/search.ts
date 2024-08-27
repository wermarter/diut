import { Inject, Injectable } from '@nestjs/common'
import { accessibleBy } from '@casl/mongoose'
import { Role, RoleAction, AuthSubject } from '@diut/hcdc'

import {
  AUTH_CONTEXT_TOKEN,
  ROLE_REPO_TOKEN,
  IAuthContext,
  IRoleRepository,
  EntitySearchOptions,
} from 'src/domain'
import { assertPermission } from 'src/app/auth/common'
import { RoleAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class RoleSearchUseCase {
  constructor(
    @Inject(ROLE_REPO_TOKEN)
    private readonly roleRepository: IRoleRepository,
    @Inject(AUTH_CONTEXT_TOKEN)
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
