import { Inject, Injectable } from '@nestjs/common'
import { accessibleBy } from '@casl/mongoose'

import {
  AuthContextToken,
  BioProductRepositoryToken,
  IAuthContext,
  IBioProductRepository,
  EntitySearchOptions,
} from 'src/domain/interface'
import {
  AuthSubject,
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

  async execute(input: EntitySearchOptions<BioProduct>) {
    const { ability } = this.authContext.getData()

    assertPermission(ability, AuthSubject.BioProduct, BioProductAction.Read)

    const paginationResult = await this.bioProductRepository.search({
      ...input,
      filter: {
        $and: [
          input.filter ?? {},
          accessibleBy(ability, BioProductAction.Read).BioProduct,
        ],
      },
    })

    return paginationResult
  }
}
