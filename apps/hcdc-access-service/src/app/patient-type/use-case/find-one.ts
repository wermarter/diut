import { Inject, Injectable } from '@nestjs/common'
import { PatientType, PatientTypeAction, AuthSubject } from '@diut/hcdc'

import {
  AUTH_CONTEXT_TOKEN,
  PATIENTTYPE_REPO_TOKEN,
  EntityFindOneOptions,
  IAuthContext,
  IPatientTypeRepository,
} from 'src/domain'
import { assertPermission } from 'src/app/auth/common'
import { PatientTypeAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class PatientTypeFindOneUseCase {
  constructor(
    @Inject(PATIENTTYPE_REPO_TOKEN)
    private readonly patientTypeRepository: IPatientTypeRepository,
    @Inject(AUTH_CONTEXT_TOKEN)
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
