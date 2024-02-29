import { Inject, Injectable } from '@nestjs/common'
import { InstrumentAction, AuthSubject } from '@diut/hcdc'

import {
  AuthContextToken,
  InstrumentRepositoryToken,
  IAuthContext,
  IInstrumentRepository,
  assertPermission,
  TestRepositoryToken,
  ITestRepository,
  EEntityCannotDelete,
} from 'src/domain'
import { InstrumentAssertExistsUseCase } from './assert-exists'

@Injectable()
export class InstrumentDeleteUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    @Inject(InstrumentRepositoryToken)
    private readonly instrumentRepository: IInstrumentRepository,
    @Inject(TestRepositoryToken)
    private readonly testRepository: ITestRepository,
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

    const connectedTestCount = await this.testRepository.count({
      instrumentId: input.id,
    })
    if (connectedTestCount > 0) {
      throw new EEntityCannotDelete(`${connectedTestCount} connected Test`)
    }

    await this.instrumentRepository.deleteById(input.id)

    return entity
  }
}
