import { Inject, Injectable } from '@nestjs/common'

import { Branch } from 'src/domain/entity'
import { EEntityNotFound } from 'src/domain/exception'
import {
  BranchRepositoryToken,
  EntityFindOneOptions,
  IBranchRepository,
} from 'src/domain/interface'

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
