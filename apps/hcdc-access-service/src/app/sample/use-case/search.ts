import { accessibleBy } from '@casl/mongoose'
import { AuthSubject, Sample, SampleAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'
import { assertPermission } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  EntitySearchOptions,
  IAuthContext,
  ISampleRepository,
  SAMPLE_REPO_TOKEN,
} from 'src/domain'
import { SampleAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class SampleSearchUseCase {
  constructor(
    @Inject(SAMPLE_REPO_TOKEN)
    private readonly sampleRepository: ISampleRepository,
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    private readonly sampleAuthorizePopulatesUseCase: SampleAuthorizePopulatesUseCase,
  ) {}

  async execute(input: EntitySearchOptions<Sample>) {
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Sample, SampleAction.Read)
    input.populates = this.sampleAuthorizePopulatesUseCase.execute(
      input.populates,
    )

    const paginationResult = await this.sampleRepository.search({
      ...input,
      filter: {
        $and: [
          input.filter ?? {},
          accessibleBy(ability, SampleAction.Read).ofType(AuthSubject.Sample),
        ],
      },
    })

    return paginationResult
  }
}
