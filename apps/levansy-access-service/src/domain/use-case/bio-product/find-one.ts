import { Inject, Injectable } from '@nestjs/common'

import {
  BioProductRepositoryToken,
  IBioProductRepository,
} from 'src/domain/interface'

@Injectable()
export class BioProductFindOneUseCase {
  constructor(
    @Inject(BioProductRepositoryToken)
    private readonly bioProductRepository: IBioProductRepository,
  ) {}

  execute(input: Parameters<IBioProductRepository['findOne']>[0]) {
    return this.bioProductRepository.findOne(input)
  }
}
