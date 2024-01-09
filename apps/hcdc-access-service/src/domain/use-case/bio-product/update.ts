import { Inject, Injectable } from '@nestjs/common'

import { BioProductAction, assertPermission } from 'src/domain/entity'
import {
  AuthContextToken,
  BioProductRepositoryToken,
  IAuthContext,
  IBioProductRepository,
} from 'src/domain/interface'
import { BioProductFindOneUseCase } from './find-one'

@Injectable()
export class BioProductUpdateUseCase {
  constructor(
    @Inject(BioProductRepositoryToken)
    private readonly bioProductRepository: IBioProductRepository,
    @Inject(AuthContextToken) private readonly authContext: IAuthContext,
    private readonly bioProductFindOneUseCase: BioProductFindOneUseCase,
  ) {}

  async execute(...input: Parameters<IBioProductRepository['update']>) {
    const { ability } = this.authContext.getData()

    const target = await this.bioProductFindOneUseCase.execute({
      filter: input[0],
    })

    if (target === null) {
      throw new Error('not found')
    }

    assertPermission(ability, 'BioProduct', BioProductAction.Update, target)

    return this.bioProductRepository.update(...input)
  }
}
