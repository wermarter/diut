import { Inject, Injectable } from '@nestjs/common'

import {
  BioProductRepositoryToken,
  IBioProductRepository,
  SearchOptions,
  SearchResult,
} from 'src/domain/interface'
import { BioProduct } from 'src/domain/entity'
import { IUseCase } from '../interface'

export type BioProductSearchUseCaseInput = SearchOptions<BioProduct>
export type BioProductSearchUseCaseOutput = SearchResult<BioProduct>

@Injectable()
export class BioProductSearchUseCase
  implements
    IUseCase<BioProductSearchUseCaseInput, BioProductSearchUseCaseOutput>
{
  constructor(
    @Inject(BioProductRepositoryToken)
    private readonly bioProductRepository: IBioProductRepository,
  ) {}

  handle(input: BioProductSearchUseCaseInput) {
    return this.bioProductRepository.search(input)
  }
}
