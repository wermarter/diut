import { Inject, Injectable } from '@nestjs/common'
import { Test } from '@diut/hcdc'

import {
  TestRepositoryToken,
  EntityFindOneOptions,
  ITestRepository,
  EEntityNotFound,
} from 'src/domain'

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
