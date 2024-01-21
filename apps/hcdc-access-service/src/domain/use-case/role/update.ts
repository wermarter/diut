import { Inject, Injectable } from '@nestjs/common'

import { AuthSubject, RoleAction, assertPermission } from 'src/domain/entity'
import {
  AuthContextToken,
  RoleRepositoryToken,
  IAuthContext,
  IRoleRepository,
} from 'src/domain/interface'
import { EEntityNotFound } from 'src/domain/exception'
import { BranchAssertExistsUseCase } from '../branch/assert-exists'

@Injectable()
export class RoleUpdateUseCase {
  constructor(
    @Inject(RoleRepositoryToken)
    private readonly roleRepository: IRoleRepository,
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    private readonly branchAssertExistsUseCase: BranchAssertExistsUseCase,
  ) {}

  async execute(...input: Parameters<IRoleRepository['update']>) {
    const { ability } = this.authContext.getData()

    const entity = await this.roleRepository.findOne({
      filter: input[0],
    })

    if (entity === null) {
      throw new EEntityNotFound(`Role ${JSON.stringify(input[0])}`)
    }

    assertPermission(ability, AuthSubject.Role, RoleAction.Update, entity)

    if (input[1]?.branchIds?.length! > 0) {
      for (const branchId of input[1].branchIds) {
        await this.branchAssertExistsUseCase.execute({
          _id: branchId,
        })
      }
    }

    return this.roleRepository.update(...input)
  }
}
