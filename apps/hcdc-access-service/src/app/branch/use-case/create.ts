import { AuthSubject, Branch, BranchAction, EntityData } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'
import { getDefaultRoleData } from 'src/app/auth'
import { assertPermission } from 'src/app/auth/common'
import { RoleCreateUseCase } from 'src/app/role/use-case/create'
import {
  AUTH_CONTEXT_TOKEN,
  BRANCH_REPO_TOKEN,
  IAuthContext,
  IBranchRepository,
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
    private readonly roleCreateUseCase: RoleCreateUseCase,
  ) {}

  async execute(input: EntityData<Branch>) {
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Branch, BranchAction.Create, input)
    await this.branchValidateUseCase.execute(input)

    const branch = await this.branchRepository.create(input)

    for (const roleData of getDefaultRoleData(branch._id)) {
      await this.roleCreateUseCase.execute(roleData)
    }

    return branch
  }
}
