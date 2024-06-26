import { Inject, Injectable } from '@nestjs/common'
import { PatientType, PatientTypeAction, AuthSubject } from '@diut/hcdc'

import {
  AuthContextToken,
  PatientTypeRepositoryToken,
  IAuthContext,
  IPatientTypeRepository,
  EntityData,
  assertPermission,
} from 'src/domain'
import { PatientTypeValidateUseCase } from './validate'

@Injectable()
export class PatientTypeCreateUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    @Inject(PatientTypeRepositoryToken)
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
