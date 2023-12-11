import { Inject, Injectable } from '@nestjs/common'

import {
  BioProductRepositoryToken,
  IBioProductRepository,
} from 'src/domain/interface'
import { BioProduct, BaseEntity } from 'src/domain/entity'
import { IUseCase } from '../interface'

export type BioProductCreateUseCaseInput = Omit<BioProduct, keyof BaseEntity>
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

  handle(input: BioProductCreateUseCaseInput) {
    return this.bioProductRepository.create(input)
  }
}
