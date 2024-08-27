import { Inject, Injectable } from '@nestjs/common'
import { Patient, PatientAction, AuthSubject, EntityData } from '@diut/hcdc'

import {
  AUTH_CONTEXT_TOKEN,
  PATIENT_REPO_TOKEN,
  IAuthContext,
  IPatientRepository,
} from 'src/domain'
import { assertPermission } from 'src/app/auth/common'
import { PatientValidateUseCase } from './validate'

@Injectable()
export class PatientCreateUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    @Inject(PATIENT_REPO_TOKEN)
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
