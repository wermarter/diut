import { Inject, Injectable } from '@nestjs/common'
import { PatientType, PatientTypeAction, AuthSubject } from '@diut/hcdc'

import {
  AuthContextToken,
  PatientTypeRepositoryToken,
  EntityFindOneOptions,
  IAuthContext,
  IPatientTypeRepository,
  assertPermission,
} from 'src/domain'
import { PatientTypeAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class PatientTypeFindOneUseCase {
  constructor(
    @Inject(PatientTypeRepositoryToken)
    private readonly patientTypeRepository: IPatientTypeRepository,
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    private readonly patientTypeAuthorizePopulatesUseCase: PatientTypeAuthorizePopulatesUseCase,
  ) {}

  async execute(input: EntityFindOneOptions<PatientType>) {
    input.populates = this.patientTypeAuthorizePopulatesUseCase.execute(
      input.populates,
    )
    const entity = await this.patientTypeRepository.findOne(input)
    const { ability } = this.authContext.getData()
    assertPermission(
      ability,
      AuthSubject.PatientType,
      PatientTypeAction.Read,
      entity,
    )

    return entity
  }
}
