import { Inject, Injectable } from '@nestjs/common'
import { PrintForm, PrintFormAction, AuthSubject } from '@diut/hcdc'

import {
  AUTH_CONTEXT_TOKEN,
  PRINTFORM_REPO_TOKEN,
  EntityFindOneOptions,
  IAuthContext,
  IPrintFormRepository,
} from 'src/domain'
import { assertPermission } from 'src/app/auth/common'
import { PrintFormAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class PrintFormFindOneUseCase {
  constructor(
    @Inject(PRINTFORM_REPO_TOKEN)
    private readonly printFormRepository: IPrintFormRepository,
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    private readonly printFormAuthorizePopulatesUseCase: PrintFormAuthorizePopulatesUseCase,
  ) {}

  async execute(input: EntityFindOneOptions<PrintForm>) {
    input.populates = this.printFormAuthorizePopulatesUseCase.execute(
      input.populates,
    )
    const entity = await this.printFormRepository.findOne(input)
    const { ability } = this.authContext.getData()
    assertPermission(
      ability,
      AuthSubject.PrintForm,
      PrintFormAction.Read,
      entity,
    )

    return entity
  }
}
