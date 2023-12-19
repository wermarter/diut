import { Inject, Injectable } from '@nestjs/common'

import {
  BioProductRepositoryToken,
  IBioProductRepository,
} from 'src/domain/interface'
import { BioProduct, EntityData } from 'src/domain/entity'
import { IUseCase } from '../interface'

export type BioProductCreateUseCaseInput = EntityData<BioProduct>
export type BioProductCreateUseCaseOutput = BioProduct

@Injectable()
export class BioProductCreateUseCase
  implements
    IUseCase<BioProductCreateUseCaseInput, BioProductCreateUseCaseOutput>
{
  constructor(
    @Inject(BioProductRepositoryToken)
    private readonly bioProductRepository: IBioProductRepository,
  ) {}

  execute(input: BioProductCreateUseCaseInput) {
    return this.bioProductRepository.create(input)
  }
}
