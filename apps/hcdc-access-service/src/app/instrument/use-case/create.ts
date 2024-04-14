import { Inject, Injectable } from '@nestjs/common'
import { Instrument, InstrumentAction, AuthSubject } from '@diut/hcdc'

import {
  AuthContextToken,
  InstrumentRepositoryToken,
  IAuthContext,
  IInstrumentRepository,
  EntityData,
  assertPermission,
} from 'src/domain'
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
