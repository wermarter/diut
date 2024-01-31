import { Inject, Injectable } from '@nestjs/common'

import { Instrument } from 'src/domain/entity'
import { EEntityNotFound } from 'src/domain/exception'
import {
  InstrumentRepositoryToken,
  EntityFindOneOptions,
  IInstrumentRepository,
} from 'src/domain/interface'

@Injectable()
export class InstrumentAssertExistsUseCase {
  constructor(
    @Inject(InstrumentRepositoryToken)
    private readonly instrumentRepository: IInstrumentRepository,
  ) {}

  async execute(input: EntityFindOneOptions<Instrument>['filter']) {
    const rv = await this.instrumentRepository.findOne({ filter: input })

    if (rv === null) {
      throw new EEntityNotFound(`Instrument ${JSON.stringify(input)}`)
    }

    return rv
  }
}
