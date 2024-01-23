import { Inject, Injectable } from '@nestjs/common'

import {
  AuthContextToken,
  BranchRepositoryToken,
  IAuthContext,
  IBranchRepository,
} from 'src/domain/interface'
import { Branch, BranchAction, EntityData } from 'src/domain/entity'
import { AuthSubject, assertPermission } from 'src/domain/auth'

@Injectable()
export class BranchCreateUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    @Inject(BranchRepositoryToken)
    private readonly branchRepository: IBranchRepository,
  ) {}

  async execute(input: EntityData<Branch>) {
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Branch, BranchAction.Create, input)

    const entity = await this.branchRepository.create(input)

    return entity
  }
}
