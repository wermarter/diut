import { Inject, Injectable } from '@nestjs/common'
import { BioProduct, BioProductAction, AuthSubject } from '@diut/hcdc'

import {
  AuthContextToken,
  BioProductRepositoryToken,
  EntityFindOneOptions,
  IAuthContext,
  IBioProductRepository,
  assertPermission,
} from 'src/domain'
import { BioProductAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class BioProductFindOneUseCase {
  constructor(
    @Inject(BioProductRepositoryToken)
    private readonly bioProductRepository: IBioProductRepository,
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    private readonly bioProductAuthorizePopulatesUseCase: BioProductAuthorizePopulatesUseCase,
  ) {}

  async execute(input: EntityFindOneOptions<BioProduct>) {
    input.populates = this.bioProductAuthorizePopulatesUseCase.execute(
      input.populates,
    )
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
