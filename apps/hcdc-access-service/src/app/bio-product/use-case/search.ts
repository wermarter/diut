import { accessibleBy } from '@casl/mongoose'
import { AuthSubject, BioProduct, BioProductAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'
import { assertPermission } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  BIOPRODUCT_REPO_TOKEN,
  EntitySearchOptions,
  IAuthContext,
  IBioProductRepository,
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
