import { Inject, Injectable } from '@nestjs/common'
import { accessibleBy } from '@casl/mongoose'
import { PrintForm, PrintFormAction, AuthSubject } from '@diut/hcdc'

import {
  AuthContextToken,
  PrintFormRepositoryToken,
  IAuthContext,
  IPrintFormRepository,
  EntitySearchOptions,
  assertPermission,
} from 'src/domain'
import { PrintFormAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class PrintFormSearchUseCase {
  constructor(
    @Inject(PrintFormRepositoryToken)
    private readonly printFormRepository: IPrintFormRepository,
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    private readonly printFormAuthorizePopulatesUseCase: PrintFormAuthorizePopulatesUseCase,
  ) {}

  async execute(input: EntitySearchOptions<PrintForm>) {
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.PrintForm, PrintFormAction.Read)
    input.populates = this.printFormAuthorizePopulatesUseCase.execute(
      input.populates,
    )

    const paginationResult = await this.printFormRepository.search({
      ...input,
      filter: {
        $and: [
          input.filter ?? {},
          accessibleBy(ability, PrintFormAction.Read).PrintForm,
        ],
      },
    })

    return paginationResult
  }
}
