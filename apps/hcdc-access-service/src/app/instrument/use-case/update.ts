import { Inject, Injectable } from '@nestjs/common'
import { InstrumentAction, AuthSubject } from '@diut/hcdc'

import {
  AuthContextToken,
  InstrumentRepositoryToken,
  IAuthContext,
  IInstrumentRepository,
  assertPermission,
} from 'src/domain'
import { InstrumentAssertExistsUseCase } from './assert-exists'
import { InstrumentValidateUseCase } from './validate'

@Injectable()
export class InstrumentUpdateUseCase {
  constructor(
    @Inject(InstrumentRepositoryToken)
    private readonly instrumentRepository: IInstrumentRepository,
    @Inject(AuthContextToken)
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
