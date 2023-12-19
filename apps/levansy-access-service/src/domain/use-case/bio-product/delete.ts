import { Inject, Injectable } from '@nestjs/common'

import {
  BioProductRepositoryToken,
  IBioProductRepository,
} from 'src/domain/interface'
import { BioProduct } from 'src/domain/entity'
import { IUseCase } from '../interface'

export type BioProductDeleteUseCaseInput = {
  id: string
}
export type BioProductDeleteUseCaseOutput = BioProduct

@Injectable()
export class BioProductDeleteUseCase
  implements
    IUseCase<BioProductDeleteUseCaseInput, BioProductDeleteUseCaseOutput>
{
  constructor(
    @Inject(BioProductRepositoryToken)
    private readonly bioProductRepository: IBioProductRepository,
  ) {}

  execute(input: BioProductDeleteUseCaseInput) {
    return this.bioProductRepository.deleteById(input.id)
  }
}
