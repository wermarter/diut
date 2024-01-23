import { Inject, Injectable } from '@nestjs/common'

import {
  AuthSubject,
  Branch,
  BranchAction,
  assertPermission,
} from 'src/domain/entity'
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
