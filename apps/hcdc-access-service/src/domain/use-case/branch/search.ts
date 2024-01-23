import { Inject, Injectable } from '@nestjs/common'
import { accessibleBy } from '@casl/mongoose'

import {
  AuthContextToken,
  BranchRepositoryToken,
  IAuthContext,
  IBranchRepository,
  EntitySearchOptions,
} from 'src/domain/interface'
import {
  AuthSubject,
  Branch,
  BranchAction,
  assertPermission,
} from 'src/domain/entity'

@Injectable()
export class BranchSearchUseCase {
  constructor(
    @Inject(BranchRepositoryToken)
    private readonly branchRepository: IBranchRepository,
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
  ) {}

  async execute(input: EntitySearchOptions<Branch>) {
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Branch, BranchAction.Read)

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
