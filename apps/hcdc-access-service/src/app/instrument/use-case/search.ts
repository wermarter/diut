import { Inject, Injectable } from '@nestjs/common'
import { accessibleBy } from '@casl/mongoose'
import { Instrument, InstrumentAction, AuthSubject } from '@diut/hcdc'

import {
  AUTH_CONTEXT_TOKEN,
  INSTRUMENT_REPO_TOKEN,
  IAuthContext,
  IInstrumentRepository,
  EntitySearchOptions,
} from 'src/domain'
import { assertPermission } from 'src/app/auth/common'
import { InstrumentAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class InstrumentSearchUseCase {
  constructor(
    @Inject(INSTRUMENT_REPO_TOKEN)
    private readonly instrumentRepository: IInstrumentRepository,
    @Inject(AUTH_CONTEXT_TOKEN)
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
          accessibleBy(ability, InstrumentAction.Read).ofType(
            AuthSubject.Instrument,
          ),
        ],
      },
    })

    return paginationResult
  }
}
