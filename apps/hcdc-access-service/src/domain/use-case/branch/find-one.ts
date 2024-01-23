import { Inject, Injectable } from '@nestjs/common'

import { Branch, BranchAction } from 'src/domain/entity'
import { AuthSubject, assertPermission } from 'src/domain/auth'
import {
  AuthContextToken,
  BranchRepositoryToken,
  EntityFindOneOptions,
  IAuthContext,
  IBranchRepository,
} from 'src/domain/interface'

@Injectable()
export class BranchFindOneUseCase {
  constructor(
    @Inject(BranchRepositoryToken)
    private readonly branchRepository: IBranchRepository,
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
  ) {}

  async execute(input: EntityFindOneOptions<Branch>) {
    const entity = await this.branchRepository.findOne(input)
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Branch, BranchAction.Read, entity)

    return entity
  }
}
