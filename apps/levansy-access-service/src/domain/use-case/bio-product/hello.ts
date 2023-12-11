import { Inject, Injectable, Logger } from '@nestjs/common'

import {
  BioProductRepositoryToken,
  IBioProductRepository,
} from 'src/domain/interface'
import { IUseCase } from '../interface'
import { BioProduct } from 'src/domain/entity'

export type BioProductHelloUseCaseInput = Omit<BioProduct, '_id'>
export type BioProductHelloUseCaseOutput = { id: string }

@Injectable()
export class BioProductHelloUseCase
  implements
    IUseCase<BioProductHelloUseCaseInput, BioProductHelloUseCaseOutput>
{
  private readonly logger = new Logger(BioProductHelloUseCase.name)
  constructor(
    @Inject(BioProductRepositoryToken)
    private readonly bioProductRepository: IBioProductRepository,
  ) {}

  async handle() {
    return this.bioProductRepository.create({})
  }
}
