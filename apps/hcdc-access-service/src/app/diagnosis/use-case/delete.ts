import { AuthSubject, DiagnosisAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'

import { assertPermission } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  DIAGNOSIS_REPO_TOKEN,
  EEntityCannotDelete,
  IAuthContext,
  IDiagnosisRepository,
  ISampleRepository,
  SAMPLE_REPO_TOKEN,
} from 'src/domain'
import { DiagnosisAssertExistsUseCase } from './assert-exists'

@Injectable()
export class DiagnosisDeleteUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    @Inject(DIAGNOSIS_REPO_TOKEN)
    private readonly diagnosisRepository: IDiagnosisRepository,
    @Inject(SAMPLE_REPO_TOKEN)
    private readonly sampleRepository: ISampleRepository,
    private readonly diagnosisAssertExistsUseCase: DiagnosisAssertExistsUseCase,
  ) {}

  async execute(input: { id: string }) {
    const entity = await this.diagnosisAssertExistsUseCase.execute({
      _id: input.id,
    })
    const { ability } = this.authContext.getData()
    assertPermission(
      ability,
      AuthSubject.Diagnosis,
      DiagnosisAction.Delete,
      entity,
    )

    const connectedSampleCount = await this.sampleRepository.count({
      diagnosisId: input.id,
    })
    if (connectedSampleCount > 0) {
      throw new EEntityCannotDelete(`${connectedSampleCount} connected Sample`)
    }

    await this.diagnosisRepository.deleteById(input.id)

    return entity
  }
}
