import { Inject, Injectable } from '@nestjs/common'

import {
  TestCategoryRepositoryToken,
  ITestCategoryRepository,
} from 'src/domain/interface'
import { TestCategory, EntityData } from 'src/domain/entity'
import { IUseCase } from '../interface'

export type TestCategoryCreateUseCaseInput = EntityData<TestCategory>
export type TestCategoryCreateUseCaseOutput = TestCategory

@Injectable()
export class TestCategoryCreateUseCase
  implements
    IUseCase<TestCategoryCreateUseCaseInput, TestCategoryCreateUseCaseOutput>
{
  constructor(
    @Inject(TestCategoryRepositoryToken)
    private readonly testCategoryRepository: ITestCategoryRepository,
  ) {}

  async handle(input: TestCategoryCreateUseCaseInput) {
    return this.testCategoryRepository.create(input)
  }
}
