import { Inject, Injectable } from '@nestjs/common'
import { PrintForm, PrintFormAction, AuthSubject } from '@diut/hcdc'

import {
  AUTH_CONTEXT_TOKEN,
  PRINTFORM_REPO_TOKEN,
  IAuthContext,
  IPrintFormRepository,
  EntityData,
  assertPermission,
} from 'src/domain'
import { PrintFormValidateUseCase } from './validate'

@Injectable()
export class PrintFormCreateUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    @Inject(PRINTFORM_REPO_TOKEN)
    private readonly printFormRepository: IPrintFormRepository,
    private readonly printFormValidateUseCase: PrintFormValidateUseCase,
  ) {}

  async execute(input: EntityData<PrintForm>) {
    const { ability } = this.authContext.getData()
    assertPermission(
      ability,
      AuthSubject.PrintForm,
      PrintFormAction.Create,
      input,
    )
    await this.printFormValidateUseCase.execute(input)

    const entity = await this.printFormRepository.create(input)

    return entity
  }
}
