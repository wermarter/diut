import { Inject, Injectable } from '@nestjs/common'

import { BioProduct } from 'src/domain/entity'
import { EEntityNotFound } from 'src/domain/exception'
import {
  BioProductRepositoryToken,
  EntityFindOneOptions,
  IBioProductRepository,
} from 'src/domain/interface'

@Injectable()
export class BioProductAssertExistsUseCase {
  constructor(
    @Inject(BioProductRepositoryToken)
    private readonly bioProductRepository: IBioProductRepository,
  ) {}

  async execute(input: EntityFindOneOptions<BioProduct>['filter']) {
    const rv = await this.bioProductRepository.findOne({ filter: input })

    if (rv === null) {
      throw new EEntityNotFound(`BioProduct ${JSON.stringify(input)}`)
    }

    return rv
  }
}
