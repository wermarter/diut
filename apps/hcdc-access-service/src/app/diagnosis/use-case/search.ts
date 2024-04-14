import { Inject, Injectable } from '@nestjs/common'
import { accessibleBy } from '@casl/mongoose'
import { Diagnosis, DiagnosisAction, AuthSubject } from '@diut/hcdc'

import {
  AuthContextToken,
  DiagnosisRepositoryToken,
  IAuthContext,
  IDiagnosisRepository,
  EntitySearchOptions,
  assertPermission,
} from 'src/domain'
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
