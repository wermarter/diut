import { Inject, Injectable } from '@nestjs/common'

import {
  BioProductRepositoryToken,
  IBioProductRepository,
} from 'src/domain/interface'
import { BioProduct, EntityData } from 'src/domain/entity'
import { IUseCase } from '../interface'

export type BioProductUpdateUseCaseInput = Partial<EntityData<BioProduct>> & {
  id: string
}
export type BioProductUpdateUseCaseOutput = BioProduct

@Injectable()
export class BioProductUpdateUseCase
  implements
    IUseCase<BioProductUpdateUseCaseInput, BioProductUpdateUseCaseOutput>
{
  constructor(
    @Inject(BioProductRepositoryToken)
    private readonly bioProductRepository: IBioProductRepository,
  ) {}

  handle(input: BioProductUpdateUseCaseInput) {
    const { id, ...data } = input
    return this.bioProductRepository.updateById(id, data)
  }
}
