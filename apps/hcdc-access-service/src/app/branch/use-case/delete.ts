import { AuthSubject, BranchAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'

import { assertPermission } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  BRANCH_REPO_TOKEN,
  EEntityCannotDelete,
  IAuthContext,
  IBranchRepository,
} from 'src/domain'
import { BranchAssertExistsUseCase } from './assert-exists'

@Injectable()
export class BranchDeleteUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    @Inject(BRANCH_REPO_TOKEN)
    private readonly branchRepository: IBranchRepository,
    private readonly branchAssertExistsUseCase: BranchAssertExistsUseCase,
  ) {}

  async execute(input: { id: string }) {
    const entity = await this.branchAssertExistsUseCase.execute({
      _id: input.id,
    })
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Branch, BranchAction.Delete, entity)

    throw new EEntityCannotDelete(`there are infinitely connected resources`)

    await this.branchRepository.deleteById(input.id)

    return entity
  }
}
