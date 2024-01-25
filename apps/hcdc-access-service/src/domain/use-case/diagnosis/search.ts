import { Inject, Injectable } from '@nestjs/common'
import { accessibleBy } from '@casl/mongoose'

import {
  AuthContextToken,
  DiagnosisRepositoryToken,
  IAuthContext,
  IDiagnosisRepository,
  EntitySearchOptions,
} from 'src/domain/interface'
import { Diagnosis, DiagnosisAction } from 'src/domain/entity'
import { AuthSubject, assertPermission } from 'src/domain/auth'
import { DiagnosisAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class DiagnosisSearchUseCase {
  constructor(
    @Inject(DiagnosisRepositoryToken)
    private readonly diagnosisRepository: IDiagnosisRepository,
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    private readonly diagnosisAuthorizePopulatesUseCase: DiagnosisAuthorizePopulatesUseCase,
  ) {}

  async execute(input: EntitySearchOptions<Diagnosis>) {
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Diagnosis, DiagnosisAction.Read)
    input.populates = this.diagnosisAuthorizePopulatesUseCase.execute(
      input.populates,
    )

    const paginationResult = await this.diagnosisRepository.search({
      ...input,
      filter: {
        $and: [
          input.filter ?? {},
          accessibleBy(ability, DiagnosisAction.Read).Diagnosis,
        ],
      },
    })

    return paginationResult
  }
}
