import { Inject, Injectable } from '@nestjs/common'
import { TestCombo } from '@diut/hcdc'

import {
  TestComboRepositoryToken,
  EntityFindOneOptions,
  ITestComboRepository,
  EEntityNotFound,
} from 'src/domain'

@Injectable()
export class TestComboAssertExistsUseCase {
  constructor(
    @Inject(TestComboRepositoryToken)
    private readonly testComboRepository: ITestComboRepository,
  ) {}

  async execute(input: EntityFindOneOptions<TestCombo>['filter']) {
    const rv = await this.testComboRepository.findOne({ filter: input })

    if (rv === null) {
      throw new EEntityNotFound(`TestCombo ${JSON.stringify(input)}`)
    }

    return rv
  }
}
