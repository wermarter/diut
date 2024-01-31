import { Inject, Injectable } from '@nestjs/common'
import { accessibleBy } from '@casl/mongoose'

import {
  AuthContextToken,
  PatientTypeRepositoryToken,
  IAuthContext,
  IPatientTypeRepository,
  EntitySearchOptions,
} from 'src/domain/interface'
import { PatientType, PatientTypeAction } from 'src/domain/entity'
import { AuthSubject, assertPermission } from 'src/domain/auth'
import { PatientTypeAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class PatientTypeSearchUseCase {
  constructor(
    @Inject(PatientTypeRepositoryToken)
    private readonly patientTypeRepository: IPatientTypeRepository,
    @Inject(AuthContextToken)
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
          accessibleBy(ability, PatientTypeAction.Read).PatientType,
        ],
      },
    })

    return paginationResult
  }
}
