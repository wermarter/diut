import { Inject, Injectable } from '@nestjs/common'
import { Test } from '@diut/hcdc'

import {
  TEST_REPO_TOKEN,
  EntityFindOneOptions,
  ITestRepository,
  EEntityNotFound,
} from 'src/domain'

@Injectable()
export class TestAssertExistsUseCase {
  constructor(
    @Inject(TEST_REPO_TOKEN)
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
