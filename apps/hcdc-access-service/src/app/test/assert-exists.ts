import { Inject, Injectable } from '@nestjs/common'

import { Test } from 'src/domain/entity'
import { EEntityNotFound } from 'src/domain/exception'
import {
  TestRepositoryToken,
  EntityFindOneOptions,
  ITestRepository,
} from 'src/domain/interface'

@Injectable()
export class TestAssertExistsUseCase {
  constructor(
    @Inject(TestRepositoryToken)
    private readonly testRepository: ITestRepository,
  ) {}

  async execute(input: EntityFindOneOptions<Test>['filter']) {
    const rv = await this.testRepository.findOne({ filter: input })

    if (rv === null) {
      throw new EEntityNotFound(`Test ${JSON.stringify(input)}`)
    }

    return rv
  }
}
