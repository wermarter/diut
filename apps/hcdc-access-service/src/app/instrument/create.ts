import { Inject, Injectable } from '@nestjs/common'

import {
  AuthContextToken,
  InstrumentRepositoryToken,
  IAuthContext,
  IInstrumentRepository,
} from 'src/domain/interface'
import { Instrument, InstrumentAction, EntityData } from 'src/domain/entity'
import { AuthSubject, assertPermission } from 'src/domain/auth'
import { InstrumentValidateUseCase } from './validate'

@Injectable()
export class InstrumentCreateUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    @Inject(InstrumentRepositoryToken)
    private readonly instrumentRepository: IInstrumentRepository,
    private readonly instrumentValidateUseCase: InstrumentValidateUseCase,
  ) {}

  async execute(input: EntityData<Instrument>) {
    const { ability } = this.authContext.getData()
    assertPermission(
      ability,
      AuthSubject.Instrument,
      InstrumentAction.Create,
      input,
    )
    await this.instrumentValidateUseCase.execute(input)

    const entity = await this.instrumentRepository.create(input)

    return entity
  }
}
