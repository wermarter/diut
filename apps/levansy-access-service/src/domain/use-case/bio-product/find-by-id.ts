import { Inject, Injectable } from '@nestjs/common'

import {
  BioProductRepositoryToken,
  IBioProductRepository,
} from 'src/domain/interface'
import { BioProduct } from 'src/domain/entity'
import { IUseCase } from '../interface'

export type BioProductFindByIdUseCaseInput = {
  id: string
}
export type BioProductFindByIdUseCaseOutput = BioProduct | null

@Injectable()
export class BioProductFindByIdUseCase
  implements
    IUseCase<BioProductFindByIdUseCaseInput, BioProductFindByIdUseCaseOutput>
{
  constructor(
    @Inject(BioProductRepositoryToken)
    private readonly bioProductRepository: IBioProductRepository,
  ) {}

  handle(input: BioProductFindByIdUseCaseInput) {
    return this.bioProductRepository.findById(input.id)
  }
}
