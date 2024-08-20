import { Inject, Injectable } from '@nestjs/common'
import { BioProduct, BioProductAction, AuthSubject } from '@diut/hcdc'

import {
  AUTH_CONTEXT_TOKEN,
  BIOPRODUCT_REPO_TOKEN,
  IAuthContext,
  IBioProductRepository,
  EntityData,
  assertPermission,
} from 'src/domain'
import { BioProductValidateUseCase } from './validate'

@Injectable()
export class BioProductCreateUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    @Inject(BIOPRODUCT_REPO_TOKEN)
    private readonly bioProductRepository: IBioProductRepository,
    private readonly bioProductValidateUseCase: BioProductValidateUseCase,
  ) {}

  async execute(input: EntityData<BioProduct>) {
    const { ability } = this.authContext.getData()
    assertPermission(
      ability,
      AuthSubject.BioProduct,
      BioProductAction.Create,
      input,
    )
    await this.bioProductValidateUseCase.execute(input)

    const entity = await this.bioProductRepository.create(input)

    return entity
  }
}
