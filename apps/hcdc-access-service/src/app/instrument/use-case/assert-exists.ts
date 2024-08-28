import { Instrument } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'

import {
  EEntityNotFound,
  EntityFindOneOptions,
  IInstrumentRepository,
  INSTRUMENT_REPO_TOKEN,
} from 'src/domain'

@Injectable()
export class InstrumentAssertExistsUseCase {
  constructor(
    @Inject(INSTRUMENT_REPO_TOKEN)
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
