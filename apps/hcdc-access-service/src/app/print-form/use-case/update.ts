import { Inject, Injectable } from '@nestjs/common'

import { PrintFormAction } from 'src/domain/entity'
import { AuthSubject, assertPermission } from 'src/domain/auth'
import {
  AuthContextToken,
  PrintFormRepositoryToken,
  IAuthContext,
  IPrintFormRepository,
} from 'src/domain/interface'
import { PrintFormAssertExistsUseCase } from './assert-exists'
import { PrintFormValidateUseCase } from './validate'

@Injectable()
export class PrintFormUpdateUseCase {
  constructor(
    @Inject(PrintFormRepositoryToken)
    private readonly printFormRepository: IPrintFormRepository,
    @Inject(AuthContextToken)
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
