import { Inject, Injectable } from '@nestjs/common'

import {
  AuthContextToken,
  BioProductRepositoryToken,
  IAuthContext,
  IBioProductRepository,
} from 'src/domain/interface'
import {
  AuthSubject,
  BioProduct,
  BioProductAction,
  EntityData,
  assertPermission,
} from 'src/domain/entity'

@Injectable()
export class BioProductCreateUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    @Inject(BioProductRepositoryToken)
    private readonly bioProductRepository: IBioProductRepository,
  ) {}

  async execute(input: EntityData<BioProduct>) {
    const { ability } = this.authContext.getData()
    assertPermission(
      ability,
      AuthSubject.BioProduct,
      BioProductAction.Create,
      input,
    )

    const entity = await this.bioProductRepository.create(input)

    return entity
  }
}
