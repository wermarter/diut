import { Inject, Injectable } from '@nestjs/common'
import { accessibleBy } from '@casl/mongoose'

import {
  AuthContextToken,
  BioProductRepositoryToken,
  IAuthContext,
  IBioProductRepository,
  EntitySearchOptions,
} from 'src/domain/interface'
import { BioProduct, BioProductAction } from 'src/domain/entity'
import { AuthSubject, assertPermission } from 'src/domain/auth'
import { BioProductAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class BioProductSearchUseCase {
  constructor(
    @Inject(BioProductRepositoryToken)
    private readonly bioProductRepository: IBioProductRepository,
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    private readonly bioProductAuthorizePopulatesUseCase: BioProductAuthorizePopulatesUseCase,
  ) {}

  async execute(input: EntitySearchOptions<BioProduct>) {
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.BioProduct, BioProductAction.Read)
    input.populates = this.bioProductAuthorizePopulatesUseCase.execute(
      input.populates,
    )

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
