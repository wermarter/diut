import { Inject, Injectable } from '@nestjs/common'

import { Patient, PatientAction } from 'src/domain/entity'
import { AuthSubject, assertPermission } from 'src/domain/auth'
import {
  AuthContextToken,
  PatientRepositoryToken,
  EntityFindOneOptions,
  IAuthContext,
  IPatientRepository,
} from 'src/domain/interface'
import { PatientAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class PatientFindOneUseCase {
  constructor(
    @Inject(PatientRepositoryToken)
    private readonly patientRepository: IPatientRepository,
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    private readonly patientAuthorizePopulatesUseCase: PatientAuthorizePopulatesUseCase,
  ) {}

  async execute(input: EntityFindOneOptions<Patient>) {
    input.populates = this.patientAuthorizePopulatesUseCase.execute(
      input.populates,
    )
    const entity = await this.patientRepository.findOne(input)
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Patient, PatientAction.Read, entity)

    return entity
  }
}
