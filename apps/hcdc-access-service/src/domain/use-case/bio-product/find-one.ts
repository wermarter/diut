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
    const { ability } = this.authContext.getData()

    const entity = await this.bioProductRepository.findOne(input)

    if (entity != null) {
      assertPermission(
        ability,
        AuthSubject.BioProduct,
        BioProductAction.Read,
        entity,
      )
    }

    return entity
  }
}
