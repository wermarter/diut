import { Inject, Injectable } from '@nestjs/common'

import {
  AuthContextToken,
  RoleRepositoryToken,
  IAuthContext,
  IRoleRepository,
} from 'src/domain/interface'
import {
  AuthSubject,
  Role,
  RoleAction,
  EntityData,
  assertPermission,
} from 'src/domain/entity'

@Injectable()
export class RoleCreateUseCase {
  constructor(
    @Inject(AuthContextToken) private readonly authContext: IAuthContext,
    @Inject(RoleRepositoryToken)
    private readonly bioProductRepository: IRoleRepository,
  ) {}

  async execute(input: EntityData<Role>) {
    const { ability } = this.authContext.getData()

    assertPermission(ability, AuthSubject.Role, RoleAction.Create, input)

    const entity = await this.bioProductRepository.create(input)

    return entity
  }
}
