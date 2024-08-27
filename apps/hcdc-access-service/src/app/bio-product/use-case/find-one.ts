import { Inject, Injectable } from '@nestjs/common'
import { BioProduct, BioProductAction, AuthSubject } from '@diut/hcdc'

import {
  AUTH_CONTEXT_TOKEN,
  BIOPRODUCT_REPO_TOKEN,
  EntityFindOneOptions,
  IAuthContext,
  IBioProductRepository,
} from 'src/domain'
import { assertPermission } from 'src/app/auth/common'
import { BioProductAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class BioProductFindOneUseCase {
  constructor(
    @Inject(BIOPRODUCT_REPO_TOKEN)
    private readonly bioProductRepository: IBioProductRepository,
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    private readonly bioProductAuthorizePopulatesUseCase: BioProductAuthorizePopulatesUseCase,
  ) {}

  async execute(input: EntityFindOneOptions<BioProduct>) {
    input.populates = this.bioProductAuthorizePopulatesUseCase.execute(
      input.populates,
    )
    const entity = await this.bioProductRepository.findOne(input)
    const { ability } = this.authContext.getData()
    assertPermission(
      ability,
      AuthSubject.BioProduct,
      BioProductAction.Read,
      entity,
    )

    return entity
  }
}
