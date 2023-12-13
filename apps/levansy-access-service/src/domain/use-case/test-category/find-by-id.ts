import { Inject, Injectable } from '@nestjs/common'

import {
  TestCategoryRepositoryToken,
  ITestCategoryRepository,
} from 'src/domain/interface'
import { TestCategory } from 'src/domain/entity'
import { IUseCase } from '../interface'

export type TestCategoryFindByIdUseCaseInput = {
  id: string
}
export type TestCategoryFindByIdUseCaseOutput = TestCategory | null

@Injectable()
export class TestCategoryFindByIdUseCase
  implements
    IUseCase<
      TestCategoryFindByIdUseCaseInput,
      TestCategoryFindByIdUseCaseOutput
    >
{
  constructor(
    @Inject(TestCategoryRepositoryToken)
    private readonly testCategoryRepository: ITestCategoryRepository,
  ) {}

  handle(input: TestCategoryFindByIdUseCaseInput) {
    return this.testCategoryRepository.findById(input.id)
  }
}
