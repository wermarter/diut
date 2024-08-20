import { Inject, Injectable } from '@nestjs/common'
import { accessibleBy } from '@casl/mongoose'
import { PatientType, PatientTypeAction, AuthSubject } from '@diut/hcdc'

import {
  AUTH_CONTEXT_TOKEN,
  PATIENTTYPE_REPO_TOKEN,
  IAuthContext,
  IPatientTypeRepository,
  EntitySearchOptions,
  assertPermission,
} from 'src/domain'
import { PatientTypeAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class PatientTypeSearchUseCase {
  constructor(
    @Inject(PATIENTTYPE_REPO_TOKEN)
    private readonly patientTypeRepository: IPatientTypeRepository,
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    private readonly patientTypeAuthorizePopulatesUseCase: PatientTypeAuthorizePopulatesUseCase,
  ) {}

  async execute(input: EntitySearchOptions<PatientType>) {
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.PatientType, PatientTypeAction.Read)
    input.populates = this.patientTypeAuthorizePopulatesUseCase.execute(
      input.populates,
    )

    const paginationResult = await this.patientTypeRepository.search({
      ...input,
      filter: {
        $and: [
          input.filter ?? {},
          accessibleBy(ability, PatientTypeAction.Read).ofType(
            AuthSubject.PatientType,
          ),
        ],
      },
    })

    return paginationResult
  }
}
