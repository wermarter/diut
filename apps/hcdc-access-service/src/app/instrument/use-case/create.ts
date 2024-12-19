import {
  AuthSubject,
  EntityData,
  Instrument,
  InstrumentAction,
} from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'
import { assertPermission } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  IAuthContext,
  IInstrumentRepository,
  INSTRUMENT_REPO_TOKEN,
} from 'src/domain'
import { InstrumentValidateUseCase } from './validate'

@Injectable()
export class InstrumentCreateUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    @Inject(INSTRUMENT_REPO_TOKEN)
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
