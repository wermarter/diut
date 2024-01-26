import { Inject, Injectable } from '@nestjs/common'

import { TestElement } from 'src/domain/entity'
import { EEntityNotFound } from 'src/domain/exception'
import {
  TestElementRepositoryToken,
  EntityFindOneOptions,
  ITestElementRepository,
} from 'src/domain/interface'

@Injectable()
export class TestElementAssertExistsUseCase {
  constructor(
    @Inject(TestElementRepositoryToken)
    private readonly testElementRepository: ITestElementRepository,
  ) {}

  async execute(input: EntityFindOneOptions<TestElement>['filter']) {
    const rv = await this.testElementRepository.findOne({ filter: input })

    if (rv === null) {
      throw new EEntityNotFound(`TestElement ${JSON.stringify(input)}`)
    }

    return rv
  }
}
