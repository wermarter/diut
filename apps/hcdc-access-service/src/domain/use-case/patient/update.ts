import { Inject, Injectable } from '@nestjs/common'

import { PatientAction } from 'src/domain/entity'
import { AuthSubject, assertPermission } from 'src/domain/auth'
import {
  AuthContextToken,
  PatientRepositoryToken,
  IAuthContext,
  IPatientRepository,
} from 'src/domain/interface'
import { PatientAssertExistsUseCase } from './assert-exists'
import { PatientValidateUseCase } from './validate'

@Injectable()
export class PatientUpdateUseCase {
  constructor(
    @Inject(PatientRepositoryToken)
    private readonly patientRepository: IPatientRepository,
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    private readonly patientAssertExistsUseCase: PatientAssertExistsUseCase,
    private readonly patientValidateUseCase: PatientValidateUseCase,
  ) {}

  async execute(...input: Parameters<IPatientRepository['update']>) {
    const entity = await this.patientAssertExistsUseCase.execute(input[0])
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Patient, PatientAction.Update, entity)
    await this.patientValidateUseCase.execute(input[1])

    return this.patientRepository.update(...input)
  }
}
