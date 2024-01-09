import { Inject, Injectable } from '@nestjs/common'

import {
  AuthContextToken,
  BioProductRepositoryToken,
  IAuthContext,
  IBioProductRepository,
  SearchOptions,
} from 'src/domain/interface'
import {
  BioProduct,
  BioProductAction,
  assertPermission,
} from 'src/domain/entity'

@Injectable()
export class BioProductSearchUseCase {
  constructor(
    @Inject(BioProductRepositoryToken)
    private readonly bioProductRepository: IBioProductRepository,
    @Inject(AuthContextToken) private readonly authContext: IAuthContext,
  ) {}

  execute(input: SearchOptions<BioProduct>) {
    const { ability } = this.authContext.getData()

    assertPermission(ability, 'BioProduct', BioProductAction.Read)

    return this.bioProductRepository.search(input)
  }
}
