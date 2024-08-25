import { Inject, Injectable } from '@nestjs/common'
import { PatientTypeAction, AuthSubject } from '@diut/hcdc'

import {
  AUTH_CONTEXT_TOKEN,
  PATIENTTYPE_REPO_TOKEN,
  IAuthContext,
  IPatientTypeRepository,
} from 'src/domain'
import { assertPermission } from 'src/app/auth/common'
import { PatientTypeAssertExistsUseCase } from './assert-exists'
import { PatientTypeValidateUseCase } from './validate'

@Injectable()
export class PatientTypeUpdateUseCase {
  constructor(
    @Inject(PATIENTTYPE_REPO_TOKEN)
    private readonly patientTypeRepository: IPatientTypeRepository,
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    private readonly patientTypeAssertExistsUseCase: PatientTypeAssertExistsUseCase,
    private readonly patientTypeValidateUseCase: PatientTypeValidateUseCase,
  ) {}

  async execute(...input: Parameters<IPatientTypeRepository['update']>) {
    const entity = await this.patientTypeAssertExistsUseCase.execute(input[0])
    const { ability } = this.authContext.getData()
    assertPermission(
      ability,
      AuthSubject.PatientType,
      PatientTypeAction.Update,
      entity,
    )
    await this.patientTypeValidateUseCase.execute(input[1])

    return this.patientTypeRepository.update(...input)
  }
}
