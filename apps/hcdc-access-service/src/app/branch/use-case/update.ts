import { Inject, Injectable } from '@nestjs/common'
import { AuthSubject, BranchAction } from '@diut/hcdc'

import {
  AUTH_CONTEXT_TOKEN,
  BRANCH_REPO_TOKEN,
  IAuthContext,
  IBranchRepository,
  assertPermission,
} from 'src/domain'
import { BranchAssertExistsUseCase } from './assert-exists'
import { BranchValidateUseCase } from './validate'

@Injectable()
export class BranchUpdateUseCase {
  constructor(
    @Inject(BRANCH_REPO_TOKEN)
    private readonly branchRepository: IBranchRepository,
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    private readonly branchAssertExistsUseCase: BranchAssertExistsUseCase,
    private readonly branchValidateUseCase: BranchValidateUseCase,
  ) {}

  async execute(...input: Parameters<IBranchRepository['update']>) {
    const entity = await this.branchAssertExistsUseCase.execute(input[0])
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Branch, BranchAction.Update, entity)
    await this.branchValidateUseCase.execute(input[1])

    return this.branchRepository.update(...input)
  }
}
