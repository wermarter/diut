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
    @Inject(AuthContextToken) private readonly authContext: IAuthContext,
    @Inject(RoleRepositoryToken)
    private readonly bioProductRepository: IRoleRepository,
    private readonly bioProductFindOneUseCase: RoleFindOneUseCase,
  ) {}

  async execute(input: { id: string }) {
    const { ability } = this.authContext.getData()

    const entity = await this.bioProductFindOneUseCase.execute({
      filter: { _id: input.id },
    })

    if (entity == null) {
      throw new EEntityNotFound(input)
    }

    assertPermission(ability, AuthSubject.Role, RoleAction.Delete, entity)

    await this.bioProductRepository.deleteById(input.id)

    return entity
  }
}
