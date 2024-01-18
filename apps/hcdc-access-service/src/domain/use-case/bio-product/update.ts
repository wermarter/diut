import { Inject, Injectable } from '@nestjs/common'

import {
  AuthSubject,
  BioProductAction,
  assertPermission,
} from 'src/domain/entity'
import {
  AuthContextToken,
  BioProductRepositoryToken,
  IAuthContext,
  IBioProductRepository,
} from 'src/domain/interface'
import { EEntityNotFound } from 'src/domain/exception'

@Injectable()
export class BioProductUpdateUseCase {
  constructor(
    @Inject(BioProductRepositoryToken)
    private readonly bioProductRepository: IBioProductRepository,
    @Inject(AuthContextToken) private readonly authContext: IAuthContext,
  ) {}

  async execute(...input: Parameters<IBioProductRepository['update']>) {
    const { ability } = this.authContext.getData()

    const entity = await this.bioProductRepository.findOne({
      filter: input[0],
    })

    if (entity === null) {
      throw new EEntityNotFound(input[0])
    }

    assertPermission(
      ability,
      AuthSubject.BioProduct,
      BioProductAction.Update,
      entity,
    )

    return this.bioProductRepository.update(...input)
  }
}
