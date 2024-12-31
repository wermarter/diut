import { AuthSubject, Instrument, InstrumentAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'
import { FilterQuery } from 'mongoose'
import { assertPermission } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  EEntityCannotDelete,
  IAuthContext,
  IInstrumentRepository,
  INSTRUMENT_REPO_TOKEN,
  ITestRepository,
  TEST_REPO_TOKEN,
} from 'src/domain'
import { InstrumentSearchUseCase } from './search'

@Injectable()
export class InstrumentDeleteUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    @Inject(INSTRUMENT_REPO_TOKEN)
    private readonly instrumentRepository: IInstrumentRepository,
    @Inject(TEST_REPO_TOKEN)
    private readonly testRepository: ITestRepository,
    private readonly instrumentSearchUseCase: InstrumentSearchUseCase,
  ) {}

  async execute(input: FilterQuery<Instrument>) {
    const { ability } = this.authContext.getData()
    const { items: instruments } = await this.instrumentSearchUseCase.execute({
      filter: input,
    })

    for (const instrument of instruments) {
      assertPermission(
        ability,
        AuthSubject.Instrument,
        InstrumentAction.Delete,
        instrument,
      )

      const connectedTestCount = await this.testRepository.count({
        instrumentId: instrument._id,
      })
      if (connectedTestCount > 0) {
        throw new EEntityCannotDelete(`${connectedTestCount} connected Test`)
      }

      await this.instrumentRepository.deleteById(instrument._id)
    }
  }
}
