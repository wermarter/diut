import { Inject, Injectable } from '@nestjs/common'
import { PrintFormAction, AuthSubject } from '@diut/hcdc'

import {
  AUTH_CONTEXT_TOKEN,
  PRINTFORM_REPO_TOKEN,
  IAuthContext,
  IPrintFormRepository,
  TEST_REPO_TOKEN,
  ITestRepository,
  EEntityCannotDelete,
} from 'src/domain'
import { PrintFormAssertExistsUseCase } from './assert-exists'
import { assertPermission } from 'src/app/auth/common'

@Injectable()
export class PrintFormDeleteUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    @Inject(PRINTFORM_REPO_TOKEN)
    private readonly printFormRepository: IPrintFormRepository,
    @Inject(TEST_REPO_TOKEN)
    private readonly testRepository: ITestRepository,
    private readonly printFormAssertExistsUseCase: PrintFormAssertExistsUseCase,
  ) {}

  async execute(input: { id: string }) {
    const entity = await this.printFormAssertExistsUseCase.execute({
      _id: input.id,
    })
    const { ability } = this.authContext.getData()
    assertPermission(
      ability,
      AuthSubject.PrintForm,
      PrintFormAction.Delete,
      entity,
    )

    const connectedTestCount = await this.testRepository.count({
      printFormIds: input.id,
    })
    if (connectedTestCount > 0) {
      throw new EEntityCannotDelete(`${connectedTestCount} connected Test`)
    }

    await this.printFormRepository.deleteById(input.id)

    return entity
  }
}
