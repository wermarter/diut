import { Inject, Injectable } from '@nestjs/common'
import { BioProduct } from '@diut/hcdc'

import {
  BIOPRODUCT_REPO_TOKEN,
  EntityFindOneOptions,
  IBioProductRepository,
  EEntityNotFound,
} from 'src/domain'

@Injectable()
export class BioProductAssertExistsUseCase {
  constructor(
    @Inject(BIOPRODUCT_REPO_TOKEN)
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
