import { Inject, Injectable } from '@nestjs/common'

import { PatientTypeAction } from 'src/domain/entity'
import { AuthSubject, assertPermission } from 'src/domain/auth'
import {
  AuthContextToken,
  PatientTypeRepositoryToken,
  IAuthContext,
  IPatientTypeRepository,
} from 'src/domain/interface'
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
