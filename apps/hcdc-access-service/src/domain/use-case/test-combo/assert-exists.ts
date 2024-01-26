import { Inject, Injectable } from '@nestjs/common'

import { TestCombo } from 'src/domain/entity'
import { EEntityNotFound } from 'src/domain/exception'
import {
  TestComboRepositoryToken,
  EntityFindOneOptions,
  ITestComboRepository,
} from 'src/domain/interface'

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
