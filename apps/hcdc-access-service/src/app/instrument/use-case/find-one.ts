import { AuthSubject, Instrument, InstrumentAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'

import { assertPermission } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  EntityFindOneOptions,
  IAuthContext,
  IInstrumentRepository,
  INSTRUMENT_REPO_TOKEN,
} from 'src/domain'
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
