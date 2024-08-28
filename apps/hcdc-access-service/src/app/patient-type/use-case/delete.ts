import { AuthSubject, PatientTypeAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'

import { assertPermission } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  EEntityCannotDelete,
  IAuthContext,
  IPatientTypeRepository,
  ISampleRepository,
  PATIENTTYPE_REPO_TOKEN,
  SAMPLE_REPO_TOKEN,
} from 'src/domain'
import { PatientTypeAssertExistsUseCase } from './assert-exists'

@Injectable()
export class PatientTypeDeleteUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    @Inject(PATIENTTYPE_REPO_TOKEN)
    private readonly patientTypeRepository: IPatientTypeRepository,
    @Inject(SAMPLE_REPO_TOKEN)
    private readonly sampleRepository: ISampleRepository,
    private readonly patientTypeAssertExistsUseCase: PatientTypeAssertExistsUseCase,
  ) {}

  async execute(input: { id: string }) {
    const entity = await this.patientTypeAssertExistsUseCase.execute({
      _id: input.id,
    })
    const { ability } = this.authContext.getData()
    assertPermission(
      ability,
      AuthSubject.PatientType,
      PatientTypeAction.Delete,
      entity,
    )

    const connectedSampleCount = await this.sampleRepository.count({
      patientTypeId: input.id,
    })
    if (connectedSampleCount > 0) {
      throw new EEntityCannotDelete(`${connectedSampleCount} connected Sample`)
    }

    await this.patientTypeRepository.deleteById(input.id)

    return entity
  }
}
