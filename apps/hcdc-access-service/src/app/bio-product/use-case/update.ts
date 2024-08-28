import { AuthSubject, BioProductAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'

import { assertPermission } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  BIOPRODUCT_REPO_TOKEN,
  IAuthContext,
  IBioProductRepository,
} from 'src/domain'
import { BioProductAssertExistsUseCase } from './assert-exists'
import { BioProductValidateUseCase } from './validate'

@Injectable()
export class BioProductUpdateUseCase {
  constructor(
    @Inject(BIOPRODUCT_REPO_TOKEN)
    private readonly bioProductRepository: IBioProductRepository,
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    private readonly bioProductAssertExistsUseCase: BioProductAssertExistsUseCase,
    private readonly bioProductValidateUseCase: BioProductValidateUseCase,
  ) {}

  async execute(...input: Parameters<IBioProductRepository['update']>) {
    const entity = await this.bioProductAssertExistsUseCase.execute(input[0])
    const { ability } = this.authContext.getData()
    assertPermission(
      ability,
      AuthSubject.BioProduct,
      BioProductAction.Update,
      entity,
    )
    await this.bioProductValidateUseCase.execute(input[1])

    return this.bioProductRepository.update(...input)
  }
}
