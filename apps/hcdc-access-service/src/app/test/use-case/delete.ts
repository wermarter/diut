import { AuthSubject, Test, TestAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'
import { FilterQuery } from 'mongoose'
import { assertPermission } from 'src/app/auth/common'
import { BioProductDeleteUseCase } from 'src/app/bio-product/use-case/delete'
import { InstrumentDeleteUseCase } from 'src/app/instrument/use-case/delete'
import { TestComboUpdateUseCase } from 'src/app/test-combo/use-case/update'
import { TestElementDeleteUseCase } from 'src/app/test-element/use-case/delete'
import {
  AUTH_CONTEXT_TOKEN,
  IAuthContext,
  ITestRepository,
  TEST_REPO_TOKEN,
} from 'src/domain'
import { TestSearchUseCase } from './search'

@Injectable()
export class TestDeleteUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    @Inject(TEST_REPO_TOKEN)
    private readonly testRepository: ITestRepository,
    private readonly testSearchUseCase: TestSearchUseCase,
    private readonly testElementDeleteUseCase: TestElementDeleteUseCase,
    private readonly bioProductDeleteUseCase: BioProductDeleteUseCase,
    private readonly instrumentDeleteUseCase: InstrumentDeleteUseCase,
    private readonly testComboUpdateUseCase: TestComboUpdateUseCase,
  ) {}

  async execute(input: FilterQuery<Test>) {
    const { ability } = this.authContext.getData()
    const { items: tests } = await this.testSearchUseCase.execute({
      filter: input,
    })

    for (const test of tests) {
      assertPermission(ability, AuthSubject.Test, TestAction.Delete, test)

      await this.testElementDeleteUseCase.execute({
        testId: test._id,
      })
      await this.bioProductDeleteUseCase.execute({
        testId: test._id,
      })
      await this.instrumentDeleteUseCase.execute({
        testId: test._id,
      })

      await this.testComboUpdateUseCase.execute(
        {
          testIds: { $elemMatch: { $eq: test._id } },
        },
        {
          $pull: { testIds: test._id },
        },
      )

      await this.testRepository.deleteById(test._id)
    }
  }
}
