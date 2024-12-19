import { AuthSubject, Test, TestAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'
import { assertPermission } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  EntityFindOneOptions,
  IAuthContext,
  ITestRepository,
  TEST_REPO_TOKEN,
} from 'src/domain'
import { TestAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class TestFindOneUseCase {
  constructor(
    @Inject(TEST_REPO_TOKEN)
    private readonly testRepository: ITestRepository,
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    private readonly testAuthorizePopulatesUseCase: TestAuthorizePopulatesUseCase,
  ) {}

  async execute(input: EntityFindOneOptions<Test>) {
    input.populates = this.testAuthorizePopulatesUseCase.execute(
      input.populates,
    )
    const entity = await this.testRepository.findOne(input)
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Test, TestAction.Read, entity)

    return entity
  }
}
