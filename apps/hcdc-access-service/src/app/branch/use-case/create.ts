import { Inject, Injectable } from '@nestjs/common'
import { Branch, BranchAction, AuthSubject } from '@diut/hcdc'

import {
  AUTH_CONTEXT_TOKEN,
  BRANCH_REPO_TOKEN,
  IAuthContext,
  IBranchRepository,
  EntityData,
  assertPermission,
} from 'src/domain'
import { BranchValidateUseCase } from './validate'

@Injectable()
export class BranchCreateUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    @Inject(BRANCH_REPO_TOKEN)
    private readonly branchRepository: IBranchRepository,
    private readonly branchValidateUseCase: BranchValidateUseCase,
  ) {}

  async execute(input: EntityData<Branch>) {
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Branch, BranchAction.Create, input)
    await this.branchValidateUseCase.execute(input)

    const entity = await this.branchRepository.create(input)

    return entity
  }
}
