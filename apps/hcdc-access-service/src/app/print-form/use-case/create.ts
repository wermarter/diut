import { AuthSubject, EntityData, PrintForm, PrintFormAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'
import { assertPermission } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  IAuthContext,
  IPrintFormRepository,
  PRINTFORM_REPO_TOKEN,
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
