import { Inject, Injectable } from '@nestjs/common'
import { Branch } from '@diut/hcdc'

import {
  BRANCH_REPO_TOKEN,
  EntityFindOneOptions,
  IBranchRepository,
  EEntityNotFound,
} from 'src/domain'

@Injectable()
export class BranchAssertExistsUseCase {
  constructor(
    @Inject(BRANCH_REPO_TOKEN)
    private readonly branchRepository: IBranchRepository,
  ) {}

  async execute(input: EntityFindOneOptions<Branch>['filter']) {
    const rv = await this.branchRepository.findOne({ filter: input })

    if (rv == null) {
      throw new EEntityNotFound(`Branch ${JSON.stringify(input)}`)
    }

    return rv
  }
}
