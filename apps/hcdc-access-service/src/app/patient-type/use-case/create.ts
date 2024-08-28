import {
  AuthSubject,
  EntityData,
  PatientType,
  PatientTypeAction,
} from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'

import { assertPermission } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  IAuthContext,
  IPatientTypeRepository,
  PATIENTTYPE_REPO_TOKEN,
} from 'src/domain'
import { PatientTypeValidateUseCase } from './validate'

@Injectable()
export class PatientTypeCreateUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    @Inject(PATIENTTYPE_REPO_TOKEN)
    private readonly patientTypeRepository: IPatientTypeRepository,
    private readonly patientTypeValidateUseCase: PatientTypeValidateUseCase,
  ) {}

  async execute(input: EntityData<PatientType>) {
    const { ability } = this.authContext.getData()
    assertPermission(
      ability,
      AuthSubject.PatientType,
      PatientTypeAction.Create,
      input,
    )
    await this.patientTypeValidateUseCase.execute(input)

    const entity = await this.patientTypeRepository.create(input)

    return entity
  }
}
