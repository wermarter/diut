import { Inject, Injectable } from '@nestjs/common'

import {
  TestCategoryRepositoryToken,
  ITestCategoryRepository,
} from 'src/domain/interface'
import { TestCategory } from 'src/domain/entity'
import { IUseCase } from '../interface'

export type TestCategoryDeleteUseCaseInput = {
  id: string
}
export type TestCategoryDeleteUseCaseOutput = TestCategory

@Injectable()
export class TestCategoryDeleteUseCase
  implements
    IUseCase<TestCategoryDeleteUseCaseInput, TestCategoryDeleteUseCaseOutput>
{
  constructor(
    @Inject(TestCategoryRepositoryToken)
    private readonly testCategoryRepository: ITestCategoryRepository,
  ) {}

  handle(input: TestCategoryDeleteUseCaseInput) {
    return this.testCategoryRepository.deleteById(input.id)
  }
}
