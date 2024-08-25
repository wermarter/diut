import { Inject, Injectable } from '@nestjs/common'
import { Instrument, InstrumentAction, AuthSubject } from '@diut/hcdc'

import {
  AUTH_CONTEXT_TOKEN,
  INSTRUMENT_REPO_TOKEN,
  EntityFindOneOptions,
  IAuthContext,
  IInstrumentRepository,
} from 'src/domain'
import { assertPermission } from 'src/app/auth/common'
import { InstrumentAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class InstrumentFindOneUseCase {
  constructor(
    @Inject(INSTRUMENT_REPO_TOKEN)
    private readonly instrumentRepository: IInstrumentRepository,
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    private readonly instrumentAuthorizePopulatesUseCase: InstrumentAuthorizePopulatesUseCase,
  ) {}

  async execute(input: EntityFindOneOptions<Instrument>) {
    input.populates = this.instrumentAuthorizePopulatesUseCase.execute(
      input.populates,
    )
    const entity = await this.instrumentRepository.findOne(input)
    const { ability } = this.authContext.getData()
    assertPermission(
      ability,
      AuthSubject.Instrument,
      InstrumentAction.Read,
      entity,
    )

    return entity
  }
}
