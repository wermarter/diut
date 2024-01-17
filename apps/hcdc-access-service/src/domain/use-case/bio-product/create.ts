import { Inject, Injectable } from '@nestjs/common'

import {
  AuthContextToken,
  BioProductRepositoryToken,
  IAuthContext,
  IBioProductRepository,
} from 'src/domain/interface'
import {
  BioProduct,
  BioProductAction,
  EntityData,
  assertPermission,
} from 'src/domain/entity'

@Injectable()
export class BioProductCreateUseCase {
  constructor(
    @Inject(AuthContextToken) private readonly authContext: IAuthContext,
    @Inject(BioProductRepositoryToken)
    private readonly bioProductRepository: IBioProductRepository,
  ) {}

  async execute(input: EntityData<BioProduct>) {
    const { ability } = this.authContext.getData()

    assertPermission(ability, 'BioProduct', BioProductAction.Create)

    const entity = await this.bioProductRepository.create(input)

    return entity
  }
}
