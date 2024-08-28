import { accessibleBy } from '@casl/mongoose'
import { AuthSubject, PrintForm, PrintFormAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'

import { assertPermission } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  EntitySearchOptions,
  IAuthContext,
  IPrintFormRepository,
  PRINTFORM_REPO_TOKEN,
} from 'src/domain'
import { PrintFormAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class PrintFormSearchUseCase {
  constructor(
    @Inject(PRINTFORM_REPO_TOKEN)
    private readonly printFormRepository: IPrintFormRepository,
    @Inject(AUTH_CONTEXT_TOKEN)
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
          accessibleBy(ability, PrintFormAction.Read).ofType(
            AuthSubject.PrintForm,
          ),
        ],
      },
    })

    return paginationResult
  }
}
