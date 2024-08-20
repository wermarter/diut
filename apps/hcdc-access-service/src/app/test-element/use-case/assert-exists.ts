import { Inject, Injectable } from '@nestjs/common'
import { TestElement } from '@diut/hcdc'

import {
  TESTELEMENT_REPO_TOKEN,
  EntityFindOneOptions,
  ITestElementRepository,
  EEntityNotFound,
} from 'src/domain'

@Injectable()
export class TestElementAssertExistsUseCase {
  constructor(
    @Inject(TESTELEMENT_REPO_TOKEN)
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
