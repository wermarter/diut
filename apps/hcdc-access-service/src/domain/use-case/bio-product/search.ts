import { Inject, Injectable } from '@nestjs/common'
import { accessibleBy } from '@casl/mongoose'

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

  async execute(input: SearchOptions<BioProduct>) {
    const { ability } = this.authContext.getData()

    assertPermission(ability, 'BioProduct', BioProductAction.Read)

    console.log(accessibleBy(ability, BioProductAction.Read).BioProduct)

    const paginationResult = await this.bioProductRepository.search({
      ...input,
      filter: {
        $and: [
          input.filter ?? {},
          accessibleBy(ability, BioProductAction.Read)['bio-product'],
        ],
      },
    })

    return paginationResult
  }
}
