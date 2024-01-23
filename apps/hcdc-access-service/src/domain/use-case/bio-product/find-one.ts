import { Inject, Injectable } from '@nestjs/common'

import {
  AuthSubject,
  BioProduct,
  BioProductAction,
  assertPermission,
} from 'src/domain/entity'
import {
  AuthContextToken,
  BioProductRepositoryToken,
  EntityFindOneOptions,
  IAuthContext,
  IBioProductRepository,
} from 'src/domain/interface'

@Injectable()
export class BioProductFindOneUseCase {
  constructor(
    @Inject(BioProductRepositoryToken)
    private readonly bioProductRepository: IBioProductRepository,
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
  ) {}

  async execute(input: EntityFindOneOptions<BioProduct>) {
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
