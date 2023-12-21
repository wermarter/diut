import { Inject, Injectable } from '@nestjs/common'

import {
  BioProductRepositoryToken,
  IBioProductRepository,
  SearchOptions,
} from 'src/domain/interface'
import { BioProduct } from 'src/domain/entity'

@Injectable()
export class BioProductSearchUseCase {
  constructor(
    @Inject(BioProductRepositoryToken)
    private readonly bioProductRepository: IBioProductRepository,
  ) {}

  execute(input: SearchOptions<BioProduct>) {
    return this.bioProductRepository.search(input)
  }
}
