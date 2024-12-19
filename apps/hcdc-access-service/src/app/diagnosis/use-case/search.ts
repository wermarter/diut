import { accessibleBy } from '@casl/mongoose'
import { AuthSubject, Diagnosis, DiagnosisAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'
import { assertPermission } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  DIAGNOSIS_REPO_TOKEN,
  EntitySearchOptions,
  IAuthContext,
  IDiagnosisRepository,
} from 'src/domain'
import { DiagnosisAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class DiagnosisSearchUseCase {
  constructor(
    @Inject(DIAGNOSIS_REPO_TOKEN)
    private readonly diagnosisRepository: IDiagnosisRepository,
    @Inject(AUTH_CONTEXT_TOKEN)
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
          accessibleBy(ability, DiagnosisAction.Read).ofType(
            AuthSubject.Diagnosis,
          ),
        ],
      },
    })

    return paginationResult
  }
}
