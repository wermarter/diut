import { AuthSubject, PatientType, PatientTypeAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'

import { assertPermission } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  EntityFindOneOptions,
  IAuthContext,
  IPatientTypeRepository,
  PATIENTTYPE_REPO_TOKEN,
} from 'src/domain'
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
