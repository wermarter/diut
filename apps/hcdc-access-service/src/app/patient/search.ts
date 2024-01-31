import { Inject, Injectable } from '@nestjs/common'
import { accessibleBy } from '@casl/mongoose'

import {
  AuthContextToken,
  PatientRepositoryToken,
  IAuthContext,
  IPatientRepository,
  EntitySearchOptions,
} from 'src/domain/interface'
import { Patient, PatientAction } from 'src/domain/entity'
import { AuthSubject, assertPermission } from 'src/domain/auth'
import { PatientAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class PatientSearchUseCase {
  constructor(
    @Inject(PatientRepositoryToken)
    private readonly patientRepository: IPatientRepository,
    @Inject(AuthContextToken)
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
          accessibleBy(ability, PatientAction.Read).Patient,
        ],
      },
    })

    return paginationResult
  }
}
