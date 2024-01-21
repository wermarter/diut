import { Inject, Injectable } from '@nestjs/common'

import { AuthSubject, RoleAction, assertPermission } from 'src/domain/entity'
import {
  AuthContextToken,
  RoleRepositoryToken,
  IAuthContext,
  IRoleRepository,
} from 'src/domain/interface'
import { RoleFindOneUseCase } from './find-one'
import { EEntityNotFound } from 'src/domain/exception'

@Injectable()
export class RoleDeleteUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    @Inject(RoleRepositoryToken)
    private readonly roleRepository: IRoleRepository,
    private readonly roleFindOneUseCase: RoleFindOneUseCase,
  ) {}

  async execute(input: { id: string }) {
    const { ability } = this.authContext.getData()

    const entity = await this.roleFindOneUseCase.execute({
      filter: { _id: input.id },
    })

    if (entity == null) {
      throw new EEntityNotFound(`Role ${JSON.stringify(input)}`)
    }

    assertPermission(ability, AuthSubject.Role, RoleAction.Delete, entity)

    await this.roleRepository.deleteById(input.id)

    return entity
  }
}
