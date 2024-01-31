import { Inject, Injectable } from '@nestjs/common'

import {
  AuthContextToken,
  PrintFormRepositoryToken,
  IAuthContext,
  IPrintFormRepository,
} from 'src/domain/interface'
import { PrintForm, PrintFormAction, EntityData } from 'src/domain/entity'
import { AuthSubject, assertPermission } from 'src/domain/auth'
import { PrintFormValidateUseCase } from './validate'

@Injectable()
export class PrintFormCreateUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    @Inject(PrintFormRepositoryToken)
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
