import { Inject, Injectable } from '@nestjs/common'
import { accessibleBy } from '@casl/mongoose'
import { PrintForm, PrintFormAction, AuthSubject } from '@diut/hcdc'

import {
  AUTH_CONTEXT_TOKEN,
  PRINTFORM_REPO_TOKEN,
  IAuthContext,
  IPrintFormRepository,
  EntitySearchOptions,
  assertPermission,
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
