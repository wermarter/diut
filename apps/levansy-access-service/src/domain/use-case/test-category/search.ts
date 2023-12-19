import { Inject, Injectable } from '@nestjs/common'

import {
  TestCategoryRepositoryToken,
  ITestCategoryRepository,
  SearchOptions,
  SearchResult,
} from 'src/domain/interface'
import { TestCategory } from 'src/domain/entity'
import { IUseCase } from '../interface'

export type TestCategorySearchUseCaseInput = SearchOptions<TestCategory>
export type TestCategorySearchUseCaseOutput = SearchResult<TestCategory>

@Injectable()
export class TestCategorySearchUseCase
  implements
    IUseCase<TestCategorySearchUseCaseInput, TestCategorySearchUseCaseOutput>
{
  constructor(
    @Inject(TestCategoryRepositoryToken)
    private readonly testCategoryRepository: ITestCategoryRepository,
  ) {}

  execute(input: TestCategorySearchUseCaseInput) {
    return this.testCategoryRepository.search(input)
  }
}
