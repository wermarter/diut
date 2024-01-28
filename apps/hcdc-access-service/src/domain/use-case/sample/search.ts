import { Inject, Injectable } from '@nestjs/common'
import { accessibleBy } from '@casl/mongoose'

import {
  AuthContextToken,
  SampleRepositoryToken,
  IAuthContext,
  ISampleRepository,
  EntitySearchOptions,
} from 'src/domain/interface'
import { Sample, SampleAction } from 'src/domain/entity'
import { AuthSubject, assertPermission } from 'src/domain/auth'
import { SampleAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class SampleSearchUseCase {
  constructor(
    @Inject(SampleRepositoryToken)
    private readonly sampleRepository: ISampleRepository,
    @Inject(AuthContextToken)
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
          accessibleBy(ability, SampleAction.Read).Sample,
        ],
      },
    })

    return paginationResult
  }
}
