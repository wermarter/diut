import { Inject, Injectable } from '@nestjs/common'

import { InstrumentAction } from 'src/domain/entity'
import { AuthSubject, assertPermission } from 'src/domain/auth'
import {
  AuthContextToken,
  InstrumentRepositoryToken,
  IAuthContext,
  IInstrumentRepository,
} from 'src/domain/interface'
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
