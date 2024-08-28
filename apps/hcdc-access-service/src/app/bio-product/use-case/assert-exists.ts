import { BioProduct } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'

import {
  BIOPRODUCT_REPO_TOKEN,
  EEntityNotFound,
  EntityFindOneOptions,
  IBioProductRepository,
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
