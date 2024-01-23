import { Inject, Injectable } from '@nestjs/common'
import { accessibleBy } from '@casl/mongoose'

import {
  AuthContextToken,
  RoleRepositoryToken,
  IAuthContext,
  IRoleRepository,
  EntitySearchOptions,
} from 'src/domain/interface'
import {
  AuthSubject,
  Role,
  RoleAction,
  assertPermission,
} from 'src/domain/entity'

@Injectable()
export class RoleSearchUseCase {
  constructor(
    @Inject(RoleRepositoryToken)
    private readonly roleRepository: IRoleRepository,
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
  ) {}

  async execute(input: EntitySearchOptions<Role>) {
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Role, RoleAction.Read)

    const paginationResult = await this.roleRepository.search({
      ...input,
      filter: {
        $and: [input.filter ?? {}, accessibleBy(ability, RoleAction.Read).Role],
      },
    })

    return paginationResult
  }
}
