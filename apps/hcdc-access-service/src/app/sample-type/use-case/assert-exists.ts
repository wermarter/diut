import { Inject, Injectable } from '@nestjs/common'

import { SampleType } from 'src/domain/entity'
import { EEntityNotFound } from 'src/domain/exception'
import {
  SampleTypeRepositoryToken,
  EntityFindOneOptions,
  ISampleTypeRepository,
} from 'src/domain/interface'

@Injectable()
export class SampleTypeAssertExistsUseCase {
  constructor(
    @Inject(SampleTypeRepositoryToken)
    private readonly sampleTypeRepository: ISampleTypeRepository,
  ) {}

  async execute(input: EntityFindOneOptions<SampleType>['filter']) {
    const rv = await this.sampleTypeRepository.findOne({ filter: input })

    if (rv === null) {
      throw new EEntityNotFound(`SampleType ${JSON.stringify(input)}`)
    }

    return rv
  }
}
