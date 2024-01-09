import { Inject, Injectable } from '@nestjs/common'

import {
  BioProductRepositoryToken,
  IBioProductRepository,
} from 'src/domain/interface'
import { BioProduct, EntityData } from 'src/domain/entity'

@Injectable()
export class BioProductCreateUseCase {
  constructor(
    @Inject(BioProductRepositoryToken)
    private readonly bioProductRepository: IBioProductRepository,
  ) {}

  execute(input: EntityData<BioProduct>) {
    return this.bioProductRepository.create(input)
  }
}
