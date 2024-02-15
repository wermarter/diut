import { Inject, Injectable } from '@nestjs/common'
import { Branch, BranchAction, AuthSubject } from '@diut/hcdc'

import {
  AuthContextToken,
  BranchRepositoryToken,
  EntityFindOneOptions,
  IAuthContext,
  IBranchRepository,
  assertPermission,
} from 'src/domain'
import { BranchAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class BranchFindOneUseCase {
  constructor(
    @Inject(BranchRepositoryToken)
    private readonly branchRepository: IBranchRepository,
    @Inject(AuthContextToken)
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
