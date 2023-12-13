import { Inject, Injectable } from '@nestjs/common'

import {
  TestCategoryRepositoryToken,
  ITestCategoryRepository,
} from 'src/domain/interface'
import { TestCategory, EntityData } from 'src/domain/entity'
import { IUseCase } from '../interface'

export type TestCategoryUpdateUseCaseInput = Partial<
  EntityData<TestCategory>
> & {
  id: string
}
export type TestCategoryUpdateUseCaseOutput = TestCategory | null

@Injectable()
export class TestCategoryUpdateUseCase
  implements
    IUseCase<TestCategoryUpdateUseCaseInput, TestCategoryUpdateUseCaseOutput>
{
  constructor(
    @Inject(TestCategoryRepositoryToken)
    private readonly testCategoryRepository: ITestCategoryRepository,
  ) {}

  handle(input: TestCategoryUpdateUseCaseInput) {
    const { id, ...data } = input
    return this.testCategoryRepository.updateById(id, data)
  }
}
