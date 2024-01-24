import { Inject, Injectable } from '@nestjs/common'

import {
  AuthContextToken,
  BioProductRepositoryToken,
  IAuthContext,
  IBioProductRepository,
} from 'src/domain/interface'
import { BioProduct, BioProductAction, EntityData } from 'src/domain/entity'
import { AuthSubject, assertPermission } from 'src/domain/auth'
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
