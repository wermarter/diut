import { Inject, Injectable } from '@nestjs/common'
import { accessibleBy } from '@casl/mongoose'
import { BioProduct, BioProductAction, AuthSubject } from '@diut/hcdc'

import {
  AUTH_CONTEXT_TOKEN,
  BIOPRODUCT_REPO_TOKEN,
  IAuthContext,
  IBioProductRepository,
  EntitySearchOptions,
  assertPermission,
} from 'src/domain'
import { BioProductAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class BioProductSearchUseCase {
  constructor(
    @Inject(BIOPRODUCT_REPO_TOKEN)
    private readonly bioProductRepository: IBioProductRepository,
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    private readonly bioProductAuthorizePopulatesUseCase: BioProductAuthorizePopulatesUseCase,
  ) {}

  async execute(input: EntitySearchOptions<BioProduct>) {
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.BioProduct, BioProductAction.Read)
    input.populates = this.bioProductAuthorizePopulatesUseCase.execute(
      input.populates,
    )

    const paginationResult = await this.bioProductRepository.search({
      ...input,
      filter: {
        $and: [
          input.filter ?? {},
          accessibleBy(ability, BioProductAction.Read).ofType(
            AuthSubject.BioProduct,
          ),
        ],
      },
    })

    return paginationResult
  }
}
