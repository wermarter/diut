import { Inject, Injectable } from '@nestjs/common'
import { PrintFormAction, AuthSubject } from '@diut/hcdc'

import {
  AuthContextToken,
  PrintFormRepositoryToken,
  IAuthContext,
  IPrintFormRepository,
  assertPermission,
  TestRepositoryToken,
  ITestRepository,
  EEntityCannotDelete,
} from 'src/domain'
import { PrintFormAssertExistsUseCase } from './assert-exists'

@Injectable()
export class PrintFormDeleteUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    @Inject(PrintFormRepositoryToken)
    private readonly printFormRepository: IPrintFormRepository,
    @Inject(TestRepositoryToken)
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
