import { Inject, Injectable } from '@nestjs/common'
import { PrintForm, PrintFormAction, AuthSubject } from '@diut/hcdc'

import {
  AuthContextToken,
  PrintFormRepositoryToken,
  EntityFindOneOptions,
  IAuthContext,
  IPrintFormRepository,
  assertPermission,
} from 'src/domain'
import { PrintFormAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class PrintFormFindOneUseCase {
  constructor(
    @Inject(PrintFormRepositoryToken)
    private readonly printFormRepository: IPrintFormRepository,
    @Inject(AuthContextToken)
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
