import { accessibleBy } from '@casl/mongoose'
import { AuthSubject, Instrument, InstrumentAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'
import { assertPermission } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  EntitySearchOptions,
  IAuthContext,
  IInstrumentRepository,
  INSTRUMENT_REPO_TOKEN,
} from 'src/domain'
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
