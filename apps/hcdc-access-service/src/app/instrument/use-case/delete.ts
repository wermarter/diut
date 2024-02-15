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

@Injectable()
export class InstrumentDeleteUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    @Inject(InstrumentRepositoryToken)
    private readonly instrumentRepository: IInstrumentRepository,
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

    await this.instrumentRepository.deleteById(input.id)

    return entity
  }
}
