import { Inject, Injectable } from '@nestjs/common'
import { BioProductAction, assertPermission } from 'src/domain/entity'

import {
  AuthContextToken,
  BioProductRepositoryToken,
  IAuthContext,
  IBioProductRepository,
} from 'src/domain/interface'
import { BioProductFindOneUseCase } from './find-one'
import { EEntityNotFound } from 'src/domain/exception'

@Injectable()
export class BioProductDeleteUseCase {
  constructor(
    @Inject(AuthContextToken) private readonly authContext: IAuthContext,
    @Inject(BioProductRepositoryToken)
    private readonly bioProductRepository: IBioProductRepository,
    private readonly bioProductFindOneUseCase: BioProductFindOneUseCase,
  ) {}

  async execute(input: { id: string }) {
    const { ability } = this.authContext.getData()

    const entity = await this.bioProductFindOneUseCase.execute({
      filter: { _id: input.id },
    })

    if (entity == null) {
      throw new EEntityNotFound(input)
    }

    assertPermission(ability, 'BioProduct', BioProductAction.Delete, entity)

    await this.bioProductRepository.deleteById(input.id)

    return entity
  }
}
