import { AuthSubject, InstrumentAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'

import { assertPermission } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  IAuthContext,
  IInstrumentRepository,
  INSTRUMENT_REPO_TOKEN,
} from 'src/domain'
import { InstrumentAssertExistsUseCase } from './assert-exists'
import { InstrumentValidateUseCase } from './validate'

@Injectable()
export class InstrumentUpdateUseCase {
  constructor(
    @Inject(INSTRUMENT_REPO_TOKEN)
    private readonly instrumentRepository: IInstrumentRepository,
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    private readonly instrumentAssertExistsUseCase: InstrumentAssertExistsUseCase,
    private readonly instrumentValidateUseCase: InstrumentValidateUseCase,
  ) {}

  async execute(...input: Parameters<IInstrumentRepository['update']>) {
    const entity = await this.instrumentAssertExistsUseCase.execute(input[0])
    const { ability } = this.authContext.getData()
    assertPermission(
      ability,
      AuthSubject.Instrument,
      InstrumentAction.Update,
      entity,
    )
    await this.instrumentValidateUseCase.execute(input[1])

    return this.instrumentRepository.update(...input)
  }
}
