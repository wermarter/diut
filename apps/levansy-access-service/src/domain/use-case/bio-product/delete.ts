import { Inject, Injectable } from '@nestjs/common'

import {
  BioProductRepositoryToken,
  IBioProductRepository,
} from 'src/domain/interface'

@Injectable()
export class BioProductDeleteUseCase {
  constructor(
    @Inject(BioProductRepositoryToken)
    private readonly bioProductRepository: IBioProductRepository,
  ) {}

  execute(input: { id: string }) {
    return this.bioProductRepository.deleteById(input.id)
  }
}
