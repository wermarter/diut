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
