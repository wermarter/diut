import { Inject, Injectable } from '@nestjs/common'
import { PatientAction, AuthSubject } from '@diut/hcdc'

import {
  AUTH_CONTEXT_TOKEN,
  PATIENT_REPO_TOKEN,
  IAuthContext,
  IPatientRepository,
} from 'src/domain'
import { assertPermission } from 'src/app/auth/common'
import { PatientAssertExistsUseCase } from './assert-exists'
import { PatientValidateUseCase } from './validate'

@Injectable()
export class PatientUpdateUseCase {
  constructor(
    @Inject(PATIENT_REPO_TOKEN)
    private readonly patientRepository: IPatientRepository,
    @Inject(AUTH_CONTEXT_TOKEN)
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
