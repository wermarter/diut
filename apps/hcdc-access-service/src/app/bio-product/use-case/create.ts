import { Inject, Injectable } from '@nestjs/common'
import { BioProduct, BioProductAction, AuthSubject } from '@diut/hcdc'

import {
  AuthContextToken,
  BioProductRepositoryToken,
  IAuthContext,
  IBioProductRepository,
  EntityData,
  assertPermission,
} from 'src/domain'
import { BioProductValidateUseCase } from './validate'

@Injectable()
export class BioProductCreateUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    @Inject(BioProductRepositoryToken)
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
