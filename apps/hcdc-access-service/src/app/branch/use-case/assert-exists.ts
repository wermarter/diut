import { Inject, Injectable } from '@nestjs/common'
import { Branch } from '@diut/hcdc'

import {
  BranchRepositoryToken,
  EntityFindOneOptions,
  IBranchRepository,
  EEntityNotFound,
} from 'src/domain'

@Injectable()
export class BranchAssertExistsUseCase {
  constructor(
    @Inject(BranchRepositoryToken)
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
