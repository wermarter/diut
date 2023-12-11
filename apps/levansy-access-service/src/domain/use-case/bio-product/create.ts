import { Inject, Injectable } from '@nestjs/common'

import {
  BioProductRepositoryToken,
  IBioProductRepository,
} from 'src/domain/interface'
import { BioProduct } from 'src/domain/entity'
import { IUseCase } from '../interface'

export type BioProductCreateUseCaseInput = BioProduct
export type BioProductCreateUseCaseOutput = void

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
    this.bioProductRepository.create(input)
  }
}
