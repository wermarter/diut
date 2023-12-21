import { Inject, Injectable } from '@nestjs/common'

import {
  BioProductRepositoryToken,
  IBioProductRepository,
} from 'src/domain/interface'

@Injectable()
export class BioProductUpdateUseCase {
  constructor(
    @Inject(BioProductRepositoryToken)
    private readonly bioProductRepository: IBioProductRepository,
  ) {}

  execute(...input: Parameters<IBioProductRepository['update']>) {
    return this.bioProductRepository.update(...input)
  }
}
