import { Inject, Injectable } from '@nestjs/common'
import { PatientTypeAction, AuthSubject } from '@diut/hcdc'

import {
  AuthContextToken,
  PatientTypeRepositoryToken,
  IAuthContext,
  IPatientTypeRepository,
  assertPermission,
} from 'src/domain'
import { PatientTypeAssertExistsUseCase } from './assert-exists'
import { PatientTypeValidateUseCase } from './validate'

@Injectable()
export class PatientTypeUpdateUseCase {
  constructor(
    @Inject(PatientTypeRepositoryToken)
    private readonly patientTypeRepository: IPatientTypeRepository,
    @Inject(AuthContextToken)
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
