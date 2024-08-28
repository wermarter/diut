import { AuthSubject, PatientTypeAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'

import { assertPermission } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  IAuthContext,
  IPatientTypeRepository,
  PATIENTTYPE_REPO_TOKEN,
} from 'src/domain'
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
