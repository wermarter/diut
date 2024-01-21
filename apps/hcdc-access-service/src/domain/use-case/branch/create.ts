import { Inject, Injectable } from '@nestjs/common'

import {
  AuthContextToken,
  BranchRepositoryToken,
  IAuthContext,
  IBranchRepository,
} from 'src/domain/interface'
import {
  AuthSubject,
  Branch,
  BranchAction,
  EntityData,
  assertPermission,
} from 'src/domain/entity'

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
