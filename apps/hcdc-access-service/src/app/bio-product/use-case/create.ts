import {
  AuthSubject,
  BioProduct,
  BioProductAction,
  EntityData,
} from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'

import { assertPermission } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  BIOPRODUCT_REPO_TOKEN,
  IAuthContext,
  IBioProductRepository,
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
