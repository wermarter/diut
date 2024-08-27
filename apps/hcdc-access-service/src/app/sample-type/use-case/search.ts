import { Inject, Injectable } from '@nestjs/common'
import { accessibleBy } from '@casl/mongoose'
import { SampleType, SampleTypeAction, AuthSubject } from '@diut/hcdc'

import {
  AUTH_CONTEXT_TOKEN,
  SAMPLETYPE_REPO_TOKEN,
  IAuthContext,
  ISampleTypeRepository,
  EntitySearchOptions,
} from 'src/domain'
import { assertPermission } from 'src/app/auth/common'
import { SampleTypeAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class SampleTypeSearchUseCase {
  constructor(
    @Inject(SAMPLETYPE_REPO_TOKEN)
    private readonly sampleTypeRepository: ISampleTypeRepository,
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    private readonly sampleTypeAuthorizePopulatesUseCase: SampleTypeAuthorizePopulatesUseCase,
  ) {}

  async execute(input: EntitySearchOptions<SampleType>) {
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.SampleType, SampleTypeAction.Read)
    input.populates = this.sampleTypeAuthorizePopulatesUseCase.execute(
      input.populates,
    )

    const paginationResult = await this.sampleTypeRepository.search({
      ...input,
      filter: {
        $and: [
          input.filter ?? {},
          accessibleBy(ability, SampleTypeAction.Read).ofType(
            AuthSubject.SampleType,
          ),
        ],
      },
    })

    return paginationResult
  }
}
