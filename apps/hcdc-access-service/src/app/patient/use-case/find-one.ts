import { Inject, Injectable } from '@nestjs/common'
import { Patient, PatientAction, AuthSubject } from '@diut/hcdc'

import {
  AUTH_CONTEXT_TOKEN,
  PATIENT_REPO_TOKEN,
  EntityFindOneOptions,
  IAuthContext,
  IPatientRepository,
  assertPermission,
} from 'src/domain'
import { PatientAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class PatientFindOneUseCase {
  constructor(
    @Inject(PATIENT_REPO_TOKEN)
    private readonly patientRepository: IPatientRepository,
    @Inject(AUTH_CONTEXT_TOKEN)
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
