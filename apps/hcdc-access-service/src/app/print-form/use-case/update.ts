import { Inject, Injectable } from '@nestjs/common'
import { PrintFormAction, AuthSubject } from '@diut/hcdc'

import {
  AUTH_CONTEXT_TOKEN,
  PRINTFORM_REPO_TOKEN,
  IAuthContext,
  IPrintFormRepository,
  assertPermission,
} from 'src/domain'
import { PrintFormAssertExistsUseCase } from './assert-exists'
import { PrintFormValidateUseCase } from './validate'

@Injectable()
export class PrintFormUpdateUseCase {
  constructor(
    @Inject(PRINTFORM_REPO_TOKEN)
    private readonly printFormRepository: IPrintFormRepository,
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    private readonly printFormAssertExistsUseCase: PrintFormAssertExistsUseCase,
    private readonly printFormValidateUseCase: PrintFormValidateUseCase,
  ) {}

  async execute(...input: Parameters<IPrintFormRepository['update']>) {
    const entity = await this.printFormAssertExistsUseCase.execute(input[0])
    const { ability } = this.authContext.getData()
    assertPermission(
      ability,
      AuthSubject.PrintForm,
      PrintFormAction.Update,
      entity,
    )
    await this.printFormValidateUseCase.execute(input[1])

    return this.printFormRepository.update(...input)
  }
}
