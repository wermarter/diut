import { Inject, Injectable } from '@nestjs/common'
import { accessibleBy } from '@casl/mongoose'
import { Patient, PatientAction, AuthSubject } from '@diut/hcdc'

import {
  AUTH_CONTEXT_TOKEN,
  PATIENT_REPO_TOKEN,
  IAuthContext,
  IPatientRepository,
  EntitySearchOptions,
} from 'src/domain'
import { assertPermission } from 'src/app/auth/common'
import { PatientAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class PatientSearchUseCase {
  constructor(
    @Inject(PATIENT_REPO_TOKEN)
    private readonly patientRepository: IPatientRepository,
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    private readonly patientAuthorizePopulatesUseCase: PatientAuthorizePopulatesUseCase,
  ) {}

  async execute(input: EntitySearchOptions<Patient>) {
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Patient, PatientAction.Read)
    input.populates = this.patientAuthorizePopulatesUseCase.execute(
      input.populates,
    )

    const paginationResult = await this.patientRepository.search({
      ...input,
      filter: {
        $and: [
          input.filter ?? {},
          accessibleBy(ability, PatientAction.Read).ofType(AuthSubject.Patient),
        ],
      },
    })

    return paginationResult
  }
}
