import { Inject, Injectable } from '@nestjs/common'
import { Instrument, InstrumentAction, AuthSubject } from '@diut/hcdc'

import {
  AuthContextToken,
  InstrumentRepositoryToken,
  EntityFindOneOptions,
  IAuthContext,
  IInstrumentRepository,
  assertPermission,
} from 'src/domain'
import { InstrumentAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class InstrumentFindOneUseCase {
  constructor(
    @Inject(InstrumentRepositoryToken)
    private readonly instrumentRepository: IInstrumentRepository,
    @Inject(AuthContextToken)
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
