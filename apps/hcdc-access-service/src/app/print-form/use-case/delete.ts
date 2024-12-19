import { AuthSubject, PrintFormAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'
import { assertPermission } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  EEntityCannotDelete,
  IAuthContext,
  IPrintFormRepository,
  ITestRepository,
  PRINTFORM_REPO_TOKEN,
  TEST_REPO_TOKEN,
} from 'src/domain'
import { PrintFormAssertExistsUseCase } from './assert-exists'

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
