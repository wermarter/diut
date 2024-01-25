import { Inject, Injectable } from '@nestjs/common'
import { accessibleBy } from '@casl/mongoose'

import {
  AuthContextToken,
  SampleTypeRepositoryToken,
  IAuthContext,
  ISampleTypeRepository,
  EntitySearchOptions,
} from 'src/domain/interface'
import { SampleType, SampleTypeAction } from 'src/domain/entity'
import { AuthSubject, assertPermission } from 'src/domain/auth'
import { SampleTypeAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class SampleTypeSearchUseCase {
  constructor(
    @Inject(SampleTypeRepositoryToken)
    private readonly sampleTypeRepository: ISampleTypeRepository,
    @Inject(AuthContextToken)
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
          accessibleBy(ability, SampleTypeAction.Read).SampleType,
        ],
      },
    })

    return paginationResult
  }
}
