import { AuthSubject, PatientType, PatientTypeAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'
import { FilterQuery } from 'mongoose'
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
import { PatientTypeSearchUseCase } from './search'

@Injectable()
export class PatientTypeDeleteUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    @Inject(PATIENTTYPE_REPO_TOKEN)
    private readonly patientTypeRepository: IPatientTypeRepository,
    @Inject(SAMPLE_REPO_TOKEN)
    private readonly sampleRepository: ISampleRepository,
    private readonly patientTypeSearchUseCase: PatientTypeSearchUseCase,
  ) {}

  async execute(input: FilterQuery<PatientType>) {
    const { ability } = this.authContext.getData()
    const { items: patientTypes } = await this.patientTypeSearchUseCase.execute(
      { filter: input },
    )

    for (const patientType of patientTypes) {
      assertPermission(
        ability,
        AuthSubject.PatientType,
        PatientTypeAction.Delete,
        patientType,
      )

      const connectedSampleCount = await this.sampleRepository.count({
        patientTypeId: patientType._id,
      })
      if (connectedSampleCount > 0) {
        throw new EEntityCannotDelete(
          `${connectedSampleCount} connected Sample`,
        )
      }

      await this.patientTypeRepository.deleteById(patientType._id)
    }
  }
}
