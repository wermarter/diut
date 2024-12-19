import { Test } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'
import {
  EEntityNotFound,
  EntityFindOneOptions,
  ITestRepository,
  TEST_REPO_TOKEN,
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
