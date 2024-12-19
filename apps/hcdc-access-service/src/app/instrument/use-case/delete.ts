import { AuthSubject, InstrumentAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'
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
import { InstrumentAssertExistsUseCase } from './assert-exists'

@Injectable()
export class InstrumentDeleteUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    @Inject(INSTRUMENT_REPO_TOKEN)
    private readonly instrumentRepository: IInstrumentRepository,
    @Inject(TEST_REPO_TOKEN)
    private readonly testRepository: ITestRepository,
    private readonly instrumentAssertExistsUseCase: InstrumentAssertExistsUseCase,
  ) {}

  async execute(input: { id: string }) {
    const entity = await this.instrumentAssertExistsUseCase.execute({
      _id: input.id,
    })
    const { ability } = this.authContext.getData()
    assertPermission(
      ability,
      AuthSubject.Instrument,
      InstrumentAction.Delete,
      entity,
    )

    const connectedTestCount = await this.testRepository.count({
      instrumentId: input.id,
    })
    if (connectedTestCount > 0) {
      throw new EEntityCannotDelete(`${connectedTestCount} connected Test`)
    }

    await this.instrumentRepository.deleteById(input.id)

    return entity
  }
}
