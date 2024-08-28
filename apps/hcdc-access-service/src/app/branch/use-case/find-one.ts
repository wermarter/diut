import { AuthSubject, Branch, BranchAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'

import { assertPermission } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  BRANCH_REPO_TOKEN,
  EntityFindOneOptions,
  IAuthContext,
  IBranchRepository,
} from 'src/domain'
import { BranchAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class BranchFindOneUseCase {
  constructor(
    @Inject(BRANCH_REPO_TOKEN)
    private readonly branchRepository: IBranchRepository,
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    private readonly branchAuthorizePopulatesUseCase: BranchAuthorizePopulatesUseCase,
  ) {}

  async execute(input: EntityFindOneOptions<Branch>) {
    input.populates = this.branchAuthorizePopulatesUseCase.execute(
      input.populates,
    )
    const entity = await this.branchRepository.findOne(input)
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Branch, BranchAction.Read, entity)

    return entity
  }
}
