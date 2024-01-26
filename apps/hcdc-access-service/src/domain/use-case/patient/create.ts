import { Inject, Injectable } from '@nestjs/common'

import {
  AuthContextToken,
  PatientRepositoryToken,
  IAuthContext,
  IPatientRepository,
} from 'src/domain/interface'
import { Patient, PatientAction, EntityData } from 'src/domain/entity'
import { AuthSubject, assertPermission } from 'src/domain/auth'
import { PatientValidateUseCase } from './validate'

@Injectable()
export class PatientCreateUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    @Inject(PatientRepositoryToken)
    private readonly patientRepository: IPatientRepository,
    private readonly patientValidateUseCase: PatientValidateUseCase,
  ) {}

  async execute(input: EntityData<Patient>) {
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Patient, PatientAction.Create, input)
    await this.patientValidateUseCase.execute(input)

    const entity = await this.patientRepository.create(input)

    return entity
  }
}
