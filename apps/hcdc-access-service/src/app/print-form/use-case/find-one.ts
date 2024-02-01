import { Inject, Injectable } from '@nestjs/common'

import { PrintForm, PrintFormAction } from 'src/domain/entity'
import { AuthSubject, assertPermission } from 'src/domain/auth'
import {
  AuthContextToken,
  PrintFormRepositoryToken,
  EntityFindOneOptions,
  IAuthContext,
  IPrintFormRepository,
} from 'src/domain/interface'
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
