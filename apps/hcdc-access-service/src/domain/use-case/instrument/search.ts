import { Inject, Injectable } from '@nestjs/common'
import { accessibleBy } from '@casl/mongoose'

import {
  AuthContextToken,
  InstrumentRepositoryToken,
  IAuthContext,
  IInstrumentRepository,
  EntitySearchOptions,
} from 'src/domain/interface'
import { Instrument, InstrumentAction } from 'src/domain/entity'
import { AuthSubject, assertPermission } from 'src/domain/auth'
import { InstrumentAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class InstrumentSearchUseCase {
  constructor(
    @Inject(InstrumentRepositoryToken)
    private readonly instrumentRepository: IInstrumentRepository,
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    private readonly instrumentAuthorizePopulatesUseCase: InstrumentAuthorizePopulatesUseCase,
  ) {}

  async execute(input: EntitySearchOptions<Instrument>) {
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Instrument, InstrumentAction.Read)
    input.populates = this.instrumentAuthorizePopulatesUseCase.execute(
      input.populates,
    )

    const paginationResult = await this.instrumentRepository.search({
      ...input,
      filter: {
        $and: [
          input.filter ?? {},
          accessibleBy(ability, InstrumentAction.Read).Instrument,
        ],
      },
    })

    return paginationResult
  }
}
