import { Inject, Injectable } from '@nestjs/common'
import { accessibleBy } from '@casl/mongoose'

import {
  AuthContextToken,
  BranchRepositoryToken,
  IAuthContext,
  IBranchRepository,
  EntitySearchOptions,
} from 'src/domain/interface'
import { Branch, BranchAction } from 'src/domain/entity'
import { AuthSubject, assertPermission } from 'src/domain/auth'
import { BranchAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class BranchSearchUseCase {
  constructor(
    @Inject(BranchRepositoryToken)
    private readonly branchRepository: IBranchRepository,
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    private readonly branchAuthorizePopulatesUseCase: BranchAuthorizePopulatesUseCase,
  ) {}

  async execute(input: EntitySearchOptions<Branch>) {
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Branch, BranchAction.Read)
    input.populates = this.branchAuthorizePopulatesUseCase.execute(
      input.populates,
    )

    const paginationResult = await this.branchRepository.search({
      ...input,
      filter: {
        $and: [
          input.filter ?? {},
          accessibleBy(ability, BranchAction.Read).Branch,
        ],
      },
    })

    return paginationResult
  }
}
